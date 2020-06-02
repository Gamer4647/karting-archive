import {Node} from "./Node.js";
export class Element extends Node {
	nodeType = Node.ELEMENT_NODE;
	namespaceURI = null;
	localName = "node";
	tagName = "NODE";
	hasAttributes() {
		return false;
	}
	attributes = [];
	getAttributeNames() {
		return [];
	}
	getAttribute(name) {
		return null;
	}
	hasAttribute(name) {
		return false;
	}
	getElementsByTagName(name) {
		return [];
	}
	children = [];
	firstElementChild = null;
	lastElementChild = null;
	childElementCount = 0;
	previousElementSibling = null;
	nextElementSibling = null;
}
