import {Node} from "./Node.js";
export class Document extends Node {
	documentElement = null;
	xmlDeclarations = [];
	implementation = null;
	xmlnsURI = null;
	constructor() {
		super();
		this.implementation = this.constructor;
	}
}
