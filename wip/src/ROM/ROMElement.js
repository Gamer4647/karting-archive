import {Attr} from "./Attr.js";
import types from "./../types.js";
import {toSymKey} from "./../utils.js";
import {ROMDocument} from "./ROMDocument.js";
import {Element} from "./Element.js";
export class ROMElement extends Element {
	namespaceURI = "http://frenchtoast.dev/ns";
	getRootNode() {
		return ROMDocument;
	}
	hasChildNodes() {
		return !!this.childElementCount;
	}
	contains(other) {
		return !!this.children.filter(
			(child) => child.constructor === ROMDocument.createAbstract(other)
		);
	}
	hasAttributes() {
		return !!Object.keys(this.attributes).length;
	}
	getAttributeNames() {
		return Object.keys(this.attributes);
	}
	getAttribute(name) {
		return this.attributes[name] || null;
	}
	hasAttribute(name) {
		return !!this.attributes[name];
	}
	getElementsByTagName(name) {
		return this.children.filter(
			(child) => child.constructor === ROMDocument.createAbstract(name)
		);
	}
	get resource() {
		return this.getElementsByTagName("resource")[0];
	}
	get request() {
		return this.getElementsByTagName("request")[0];
	}
	get params() {
		return this.getElementsByTagName("param");
	}
	get response() {
		return this.getElementsByTagName("response")[0];
	}
	get elements() {
		return this.getElementsByTagName("element");
	}
	get vectors() {
		return this.getElementsByTagName("vector");
	}
	get attributes() {
		return this.getElementsByTagName("attribute");
	}
	constructor({
		tree,
		parentNode,
		previousElementSibling,
		nextElementSibling,
		tagName
	}) {
		super();
		let $tree = tree,
			details = [],
			children = [];
		for (let sub in $tree) {
			if (sub !== Attr.ATTRIBUTES_SYMBOL) {
				$tree[sub].forEach((innerTree) => {
					details = [...details, [sub, innerTree]];
				});
			}
		}
		for (let d = 0; d < details.length; d++) {
			let previousSibling = details[d - 1] || [],
				nextSibling = details[d + 1] || [];
			children = [
				...children,
				new (ROMDocument.createAbstract(details[d][0]))({
					tree: details[d][1],
					parentNode: this.constructor,
					previousElementSibling: ROMDocument.createAbstract(
						previousSibling[0]
					),
					nextElementSibling: ROMDocument.createAbstract(nextSibling[0]),
					tagName: details[d][0]
				})
			];
		}
		this.isConnected = true;
		this.ownerDocument = ROMDocument;
		this.parentNode = parentNode || null;
		this.childNodes = children.map((child) => child.constructor);
		this.nodeName = (tagName || this.tagName).toUpperCase();
		this.localName = (tagName || this.tagName).toLowerCase();
		this.tagName = (tagName || this.tagName).toUpperCase();
		this.attributes = (tree || {})[Attr.ATTRIBUTES_SYMBOL] || {};
		this.children = children;
		this.firstElementChild = children[0] || null;
		this.lastElementChild = children[children.length - 1] || null;
		this.childElementCount = children.length;
		this.previousElementSibling = previousElementSibling || null;
		this.nextElementSibling = nextElementSibling || null;
		this.name = this.attributes.name || null;
		this.type = types[toSymKey(this.attributes.type)] || null;
	}
}
