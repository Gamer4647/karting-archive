import _ from "./generate.js";
import {isDefined} from "./utils.js";
export default {
	pagination() {
		let c = "";
		c += _.LI("page").concat(
			_.CALL(
				"min",
				_.CALL(
					"max",
					_.CAST(1).concat(
						_.ARGV,
						_.CALL("Request::getInteger", _.TEXT("page")).concat(
							_.NULLCO(_.CAST(1))
						)
					)
				).concat(_.ARGV, _.CAST(65535))
			).concat(_.NOP)
		);
		c += _.LI("per_page").concat(
			_.CALL(
				"min",
				_.CALL(
					"max",
					_.CAST(0).concat(
						_.ARGV,
						_.CALL("Request::getInteger", _.TEXT("per_page")).concat(
							_.NULLCO(_.CAST(255))
						)
					)
				).concat(_.ARGV, _.CAST(255))
			).concat(_.NOP)
		);
		c += _.LI("limit").concat(
			_.CALL(
				"min",
				_.CALL(
					"max",
					_.CAST(0).concat(
						_.ARGV,
						_.CALL("Request::getInteger", _.TEXT("limit")).concat(
							_.NULLCO(_.CAST(65535))
						)
					)
				).concat(_.ARGV, _.CAST(65535))
			).concat(_.NOP)
		);
		c += _.LI("pagination").concat(
			_.NEW,
			_.CALL(
				"Pagination",
				_.LOAD("page").concat(
					_.ARGV,
					_.LOAD("per_page"),
					_.ARGV,
					_.LOAD("limit")
				)
			),
			_.NOP
		);
		return c;
	},
	setEnum(fields) {
		let c = "";
		const {name} = fields;
		c += _.IF(
			_.NOT.concat(
				_.CALL(
					"in_array",
					_.LOAD(name).concat(_.ARGV, _.ENUM(_.CONS(name)), _.ARGV, _.BIT(true))
				)
			),
			_.TNE("HTTP_FIELD_ENUM_RANGE").concat(_.NOP)
		);
		return c;
	},
	setClamp(snippet, fields) {
		let c = "";
		const {name, type, minvalue, maxvalue} = fields;
		if (!isDefined(minvalue) && isDefined(maxvalue)) {
			c += _.LI(name).concat(
				_.CALL(
					"min",
					_.CALL(
						"max",
						_.CAST(0).concat(
							_.ARGV,
							_.CALL(`Request::get${type.description}`, _.TEXT(name))
						)
					).concat(_.ARGV, _.CAST(maxvalue))
				).concat(_.NOP)
			);
		} else if (isDefined(minvalue) && !isDefined(maxvalue)) {
			c += _.LI(name).concat(
				_.CALL(
					"min",
					_.CALL(
						"max",
						_.CAST(minvalue).concat(
							_.ARGV,
							_.CALL(`Request::get${type.description}`, _.TEXT(name))
						)
					).concat(_.ARGV, _.CAST(_.MAX))
				).concat(_.NOP)
			);
		} else if (isDefined(minvalue) && isDefined(maxvalue)) {
			c += _.LI(name).concat(
				_.CALL(
					"min",
					_.CALL(
						"max",
						_.CAST(minvalue).concat(
							_.ARGV,
							_.CALL(`Request::get${type.description}`, _.TEXT(name))
						)
					).concat(_.ARGV, _.CAST(maxvalue))
				).concat(_.NOP)
			);
		} else {
			c += _.LI(name).concat(
				_.CALL(
					"min",
					_.CALL(
						"max",
						_.CAST(0).concat(
							_.ARGV,
							_.CALL(`Request::get${type.description}`, _.TEXT(name))
						)
					).concat(_.ARGV, _.CAST(_.MAX))
				).concat(_.NOP)
			);
		}
		return _.IFE(
			_.CALL(`Request::get${type.description}`, _.TEXT(name)).concat(
				_.NEQV,
				_.NULL
			),
			c,
			snippet.concat(_.NOP)
		);
	},
	setLength(snippet, fields) {
		const {name, type, minlength, maxlength} = fields;
		let c,
			gp = _.CALL(`Request::get${type.description}`, _.TEXT(name)),
			strlen = `${_.CALL("mb_strlen", gp)}`,
			tne = `${_.TNE("HTTP_FIELD_LENGTH")}${_.NOP}`,
			ic = `${_.CLO(`${_.LI(name)}${gp}`)}${_.NEQV}${_.NULL}`,
			nl = `${_.LOR}\n${_.INT(2)}`;
		function $max(maxlength) {
			c = strlen;
			switch (maxlength) {
				case 0:
					c = null;
					break;
				case 1:
					break;
				default:
					c += `${_.GT}${_.CAST(maxlength)}`;
			}
			return c;
		}
		function $min(minlength, max) {
			c = strlen;
			switch (minlength) {
				case 0:
					c = null;
					break;
				case 1:
					c = `${_.NOT}${c}`;
					break;
				default:
					c += `${_.LT}${_.CAST(minlength)}`;
			}
			if (minlength) {
				if (isDefined(max)) {
					c = `(${c}${nl}${max})`;
				} else {
					c = `(${c}${nl}${strlen}${_.GT}${_.MAX})`;
				}
			} else if (!isDefined(max)) {
				c = `${strlen}${_.GT}${_.MAX}`;
			} else if (isDefined(max)) {
				c = max;
			}
			return c;
		}
		if (!isDefined(minlength) && isDefined(maxlength)) {
			$max(maxlength);
		} else if (isDefined(minlength) && !isDefined(maxlength)) {
			$min(minlength);
		} else if (isDefined(minlength) && isDefined(maxlength)) {
			if (!minlength && !maxlength) {
				c = `${strlen}${_.GT}${_.CAST(0)}`;
			} else if (minlength > maxlength) {
				c = null;
			} else if (minlength === maxlength) {
				c = `${strlen}${_.NEQV}${_.CAST(maxlength)}`;
			} else {
				$min(minlength, $max(maxlength));
			}
		} else {
			c = $max(_.MAX);
		}
		if (isDefined(c)) {
			if (snippet === `${_.LI(name)}${_.NULL}`) {
				return _.IF(`${ic}${_.LAND}\n${_.INT(2)}${c}`, tne);
			} else {
				return _.IFE(ic, _.IF(c, tne), `${snippet}${_.NOP}`);
			}
		} else {
			if (snippet === `${_.LI(name)}${_.NULL}`) {
				return _.IF(ic, tne);
			} else {
				return _.IFE(ic, tne, `${snippet}${_.NOP}`);
			}
		}
	},
	xmlWriter: {
		writeElement(indent, name, {value, key: key} = {key: "row"}) {
			name = _.TEXT(name);
			value = value ? value : `${_.LOAD(key)}[${name}]`;
			return `${indent}${_.CALL(
				"$response->writeElement",
				`${name}${_.ARGV}${value}`
			)}${_.NOP}`;
		},
		writeAttribute(indent, name, {value, key: key} = {key: "row"}) {
			name = _.TEXT(name);
			value = value ? value : `${_.LOAD(key)}[${name}]`;
			return `${indent}${_.CALL(
				"$response->writeAttribute",
				`${name}${_.ARGV}${value}`
			)}${_.NOP}`;
		},
		startElement(indent, name) {
			return `${indent}${_.CALL("$response->startElement", _.TEXT(name))}${
				_.NOP
			}`;
		},
		endElement(indent, name) {
			return `${indent}${_.CALL("$response->endElement", _.NOP)}${_.NOP}`;
		},
		endDocument(indent, name) {
			return `${indent}${_.CALL("$response->endDocument", _.NOP)}${_.NOP}`;
		}
	}
};
