import {isDefined, isString, isBoolean, toSymKey} from "./utils.js";
import $TypeError from "./annotate.js";
export default {
	INDENT: "..",
	IMPORTS: [],
	LF: `\n`,
	NOP: `;\n`,
	ARGV: ", ",
	NULL: "null",
	NEW: "new ",
	LT: " < ",
	GT: " > ",
	LTE: " <= ",
	GTE: " >= ",
	CMP: " <=> ",
	EQV: " === ",
	NEQV: " !== ",
	SHFL: " << ",
	SHFR: " >> ",
	AND: " & ",
	LAND: " && ",
	OR: " | ",
	LOR: " || ",
	NOT: "!",
	XOR: "^",
	NEG: "~",
	MIN: "0",
	MAX: "2048",
	$isString(value, {identifier: identifier} = {identifier: false}) {
		if (!isDefined(value))
			throw new $TypeError({
				string: value,
				state: $TypeError.REFERENCE_UNDEFINED
			});
		if (!isString(value))
			throw new $TypeError({
				string: value,
				state: $TypeError.MISMATCH_TYPE_STRING
			});
		if (!value.trim())
			throw new $TypeError({
				string: value,
				state: $TypeError.STRING_EMPTY_TEXT
			});
		if (identifier && !toSymKey(value))
			throw new $TypeError({
				string: value,
				state: $TypeError.BAD_IDENTIFIER_NAME
			});
		return null;
	},
	$isBoolean(value) {
		if (!isDefined(value))
			throw new $TypeError({
				string: value,
				state: $TypeError.REFERENCE_UNDEFINED
			});
		if (!isBoolean(value))
			throw new $TypeError({
				string: value,
				state: $TypeError.MISMATCH_TYPE_BOOLEAN
			});
		return null;
	},
	$isNumber(value) {
		if (!isDefined(value))
			throw new $TypeError({
				string: value,
				state: $TypeError.REFERENCE_UNDEFINED
			});
		if (!Number.isFinite(value))
			throw new $TypeError({
				string: value,
				state: $TypeError.MISMATCH_TYPE_NUMBER
			});
		return null;
	},
	PHP: function({short_tags}) {
		this.$isBoolean(short_tags);
		return short_tags ? `<?${this.LF}` : `<?php${this.LF}`;
	},
	LI: function(string) {
		this.$isString(string, {identifier: true});
		string = toSymKey(string).toLowerCase();
		return `$${string} = `;
	},
	LOAD: function(string) {
		this.$isString(string, {identifier: true});
		string = toSymKey(string).toLowerCase();
		return `$${string}`;
	},
	TEXT: function(string) {
		this.$isString(string);
		if (string.includes("'") && !string.includes('"')) {
			return `"${string}"`;
		} else if (!string.includes("'") && string.includes('"')) {
			return `'${string}'`;
		} else if (!string.includes("'") && !string.includes('"')) {
			return `'${string}'`;
		} else {
			return `"${string.replace(/"/, '\\"')}"`;
		}
	},
	CAST: function(string) {
		if (!isDefined(string))
			throw new $TypeError({string, state: $TypeError.REFERENCE_UNDEFINED});
		if (
			!isNaN(parseFloat(String(string).replace(/^[!\^~]/gu, ""))) &&
			isFinite(String(string).replace(/^[!\^~]/gu, ""))
		) {
			return String(string);
		} else {
			this.$isString(string);
			return this.TEXT(string);
		}
	},
	CONS: function(string) {
		this.$isString(string, {identifier: true});
		string = toSymKey(string);
		this.IMPORTS = [...this.IMPORTS, string];
		return string;
	},
	CALL: function(string, argvs) {
		this.$isString(string);
		this.$isString(argvs);
		return argvs === this.NOP ? `${string}()` : `${string}(${argvs})`;
	},
	NULLCO: function(string) {
		this.$isString(string);
		return ` ?? ${string}`;
	},
	TNE: function(string) {
		this.$isString(string, {identifier: true});
		string = toSymKey(string);
		return `new NookinException(${string})`;
	},
	DEC: function(string, argvs) {
		this.$isString(string, {identifier: true});
		this.$isString(String(argvs));
		string = toSymKey(string);
		return this.CALL("declare", `${string} = ${this.CAST(argvs)}`);
	},
	INC: function(string) {
		this.$isString(string);
		return "";
	},
	USE: function(string) {
		this.$isString(string);
		return "";
	},
	BIT: function(bcbit) {
		this.$isBoolean(bcbit);
		return bcbit ? "true" : "false";
	},
	ENUM: function(string) {
		this.$isString(string, {identifier: true});
		string = toSymKey(string);
		return `Options::${string}`;
	},
	CLO: function(string) {
		this.$isString(string);
		return `(${string})`;
	},
	IF: function(string, bcif, {$if: $if} = {$if: "if"}) {
		this.$isString(string);
		this.$isString(bcif);
		this.$isString($if);
		let $LF = this.LF;
		bcif = bcif
			.trim()
			.split($LF)
			.join(`${$LF}${this.INDENT}`)
			.trimEnd();
		return `${$if} (${string}) {${$LF}${this.INDENT}${bcif}${$LF}}${$LF}`;
	},
	IFE: function(
		string,
		bcif,
		bcife,
		{$if: $if, $else: $else} = {$if: "if", $else: "else"}
	) {
		this.$isString(string);
		this.$isString(bcif);
		this.$isString(bcife);
		this.$isString($if);
		this.$isString($else);
		let $LF = this.LF;
		bcif = bcif
			.trim()
			.split($LF)
			.join(`${$LF}${this.INDENT}`)
			.trimEnd();
		bcife = bcife
			.trim()
			.split($LF)
			.join(`${$LF}${this.INDENT}`)
			.trimEnd();
		return `${$if} (${string}) {${$LF}${this.INDENT}${bcif}${$LF}} ${$else} {${$LF}${this.INDENT}${bcife}${$LF}}${$LF}`;
	},
	INT: function(bcint) {
		this.$isNumber(bcint);
		return this.INDENT.repeat(Math.max(0, bcint));
	}
};
