import {Node} from "./Node.js";
export class Attr extends Node {
	static ATTRIBUTES_SYMBOL = "#attributes";
	nodeType = Node.ATTRIBUTE_NODE;
	nodeName = null;
}
