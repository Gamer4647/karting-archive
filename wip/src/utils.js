import * as entities from "entities";
export function isDefined(reference) {
	return reference === undefined
		? false
		: reference === null
		? false
		: !Number.isNaN(reference);
}
export function isString(reference) {
	return typeof reference === "string";
}
export function isBoolean(reference) {
	return typeof reference === "boolean";
}
export function toBoolean(string = "") {
	return new RegExp(
		/(?:^|^[\s\u{FEFF}\xA0]*)(true)(?:[\s\u{FEFF}\xA0]*$|$)/u
	).test(string);
}
export function toSymKey(string = "") {
	if (
		new RegExp(
			/(?:^|^[\s\u{FEFF}\xA0]*)([$a-z-_][$a-z0-9-_]*(\[[$a-z-_][$a-z0-9-_]*\])*)(?:[\s\u{FEFF}\xA0]*$|$)/iu
		).test(string)
	) {
		string = string
			.trim()
			.toUpperCase()
			.replace(/-/g, "_")
			.split("[");
		return string[string.length - 1].replace(/\]$/g, "");
	} else {
		return null;
	}
}
export function sanitize(markup = "") {
	markup = entities.decodeHTML(markup);
	return markup;
}
