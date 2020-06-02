import fs from "fs";
import stripBOM from "strip-bom";
import domParser from "xml-js";
import {Attr} from "./ROM/Attr.js";
import consola from "consola";
import chalk from "chalk";
import {configureStore} from "@reduxjs/toolkit";
import _ from "./generate.js";
import types from "./types.js";
import snippets from "./snippets.js";
import {toBoolean, toSymKey, sanitize} from "./utils.js";
import {ROMDocument} from "./ROM/ROMDocument.js";
import {
	ROMResourceElement,
	ROMRequestElement,
	ROMParamElement,
	ROMResponseElement,
	ROMElementElement,
	ROMVectorElement,
	ROMAttributeElement
} from "./ROM/ROMElements.js";
import Response from "./features/Response.js";
for (let file = 2; file < process.argv.length; file++) {
	try {
		let action;
		const b = process.argv[file].split('.')[process.argv[file].split('.').length-2];
		switch (b) {
			case 'list':
			case 'latest':
			case 'view':
			case 'show':
			case 'bulk_fetch':
				action = 'SELECT';
				break;
			default:
				consola.info('>> '+b);
				continue;
		}
		
		//process.exit(0);
		let schema = new ROMDocument(
				domParser.xml2js(
					stripBOM(fs.readFileSync(process.argv[file], "utf8")),
					{
						compact: true,
						trim: true,
						sanitize: false,
						nativeType: false,
						nativeTypeAttributes: false,
						addParent: false,
						alwaysArray: true,
						alwaysChildren: false,
						instructionHasAttributes: true,
						ignoreDeclaration: true,
						ignoreInstruction: true,
						ignoreAttributes: false,
						ignoreComment: true,
						ignoreCdata: true,
						ignoreDoctype: true,
						ignoreText: true,
						attributesKey: Attr.ATTRIBUTES_SYMBOL,
						elementNameFn: (t) => sanitize(t),
						attributeNameFn: (t) => sanitize(t),
						attributeValueFn: (t) => sanitize(t)
					}
				)
			).documentElement.firstElementChild,
			c = `${_.DEC("strict_types", 1)}${_.NOP}`,
			params = schema.request.params,
			blacklistedNames = ["page", "per_page", "limit"],
			whitelistedProps = ["name", "type", "required", "default"];
		const sortKeys = new Intl.Collator("en", {
			localeMatcher: "lookup",
			usage: "sort",
			sensitivity: "variant",
			ignorePunctuation: false,
			numeric: true,
			caseFirst: "lower"
		});
		params.sort((a, b) => sortKeys.compare(a.name, b.name));
		for (const param of params) {
			if (blacklistedNames.includes(param.name)) continue;
			let {
				placeholder = param.attributes["default"],
				encoding,
				encryption,
				max_length,
				maxlength,
				maxvalue,
				minlength,
				minvalue,
				name,
				options,
				required = false,
				salt = false,
				type
			} = param.attributes;
			name = toSymKey(name).toLowerCase();
			type = types[toSymKey(type)] || Symbol.for("Void");
			required = toBoolean(required);
			salt = toBoolean(salt);
			let description = type.description;
			if (max_length) {
				consola.warn(
					chalk.yellow(
						`Usage of “max_length” on "${name}" (${description}) is DEPRECATED.
Avoid using it. Instead of “max_length”, please use “maxlength” (the alias of it).`
					)
				);
			}
			let snippet;
			if (placeholder === "[session]") {
				snippet = _.CALL(`Cookie::get${description}`, _.TEXT(name));
			} else if (placeholder) {
				snippet = _.CAST(placeholder);
			} else if (required) {
				snippet = _.TNE("HTTP_FIELD_REQUIRED");
			} else if (!required) {
				snippet = _.NULL;
			}
			let conditionedType =
				type === Symbol.for("String") || type === Symbol.for("Integer");
			if (conditionedType && (placeholder || !required)) {
				snippet = `${_.LI(name)}${snippet}`;
			} else if (type === Symbol.for("Binary")) {
				snippet = `\n${_.INTENT}${snippet}`;
				c += _.LI(name).concat(
					_.CALL(`Request::get${type.description}`, _.TEXT(name)),
					_.ARGV,
					_.CONS("BASE64_ENCODING"),
					_.NULLCO(snippet),
					_.NOP
				);
			} else if (!conditionedType) {
				snippet = `\n${_.INTENT}${snippet}`;
				c += _.LI(name).concat(
					_.CALL(`Request::get${type.description}`, _.TEXT(name)),
					_.NULLCO(snippet),
					_.NOP
				);
			}
			switch (type) {
				case Symbol.for("String"):
					whitelistedProps = [...whitelistedProps, "encryption", "salt"];
					if (options) {
						whitelistedProps = [...whitelistedProps, "options"];
						c += snippets.setEnum({name});
					} else {
						whitelistedProps = [
							...whitelistedProps,
							"minlength",
							"maxlength",
							"max_length"
						];
						if (!maxlength && max_length) maxlength = max_length;
						if (minlength) minlength = Number(minlength);
						if (maxlength) maxlength = Number(maxlength);
						c += snippets.setLength(snippet, {
							name,
							type,
							minlength,
							maxlength
						});
					}
					break;
				case Symbol.for("Array"):
					whitelistedProps = [...whitelistedProps];
					break;
				case Symbol.for("Integer"):
					whitelistedProps = [...whitelistedProps, "minvalue", "maxvalue"];
					c += snippets.setClamp(snippet, {name, type, minvalue, maxvalue});
					break;
				case Symbol.for("Decimal"):
					whitelistedProps = [...whitelistedProps];
					break;
				case Symbol.for("Float"):
					whitelistedProps = [...whitelistedProps];
					break;
				case Symbol.for("Boolean"):
					whitelistedProps = [...whitelistedProps];
					break;
				case Symbol.for("Datetime"):
					whitelistedProps = [...whitelistedProps];
					break;
				case Symbol.for("Binary"):
					whitelistedProps = [...whitelistedProps, "encoding"];
					if (!encoding) {
						consola.warn(
							chalk.yellow(
								`Although optional, “encoding="base64"” on "${name}" (${description})
should be explicit — so that there's potential compatibility with clients
that don't have “base64” as the default encoding for type ${description}.
The game doesn't actually read this attribute at all, but we don't know if it
ever did at one point in development. Therefore, it is being kept.`
							)
						);
					} else if (encoding !== "base64") {
						consola.warn(
							chalk.yellow(
								`The only accepted value for “encoding” on "${name}" (${description})
is “base64”. It's currently set to “${encoding}”. Which are not the same.
The game doesn't actually read this attribute at all, but we don't know if it
ever did at one point in development. Therefore, it is being kept.`
							)
						);
					}
					break;
				case Symbol.for("File"):
					whitelistedProps = [...whitelistedProps];
					break;
				default:
			}
			let offending = [];
			for (const property in param.attributes) {
				if (!whitelistedProps.includes(property))
					offending = [...offending, property];
			}
			if (offending.length) {
				throw new TypeError(
					`Some properties set on "${name}" (${description}) are not meant for this combo (${offending.join(
						", "
					)}).`
				);
			}
		}
		const response = new Response(schema);
		const store = configureStore({
			reducer: response.reducer
		});
		response.generate(store);
		//consola.info(store.getState());
	} catch (e) {
		consola.error(e);
	}
}
