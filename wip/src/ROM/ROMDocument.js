import {Document} from "./Document.js";
import {ROMInstruction} from "./ROMInstruction.js";
import {ROMElement} from "./ROMElement.js";
import {
	ROMResourceElement,
	ROMRequestElement,
	ROMParamElement,
	ROMResponseElement,
	ROMElementElement,
	ROMVectorElement,
	ROMAttributeElement
} from "./ROMElements.js";
export class ROMDocument extends Document {
	xmlnsURI = "http://frenchtoast.dev/ns";
	getRootNode() {
		return ROMDocument;
	}
	hasChildNodes() {
		return true;
	}
	static createAbstract(tagName) {
		if (tagName) {
			switch (tagName.toUpperCase()) {
				case "RESOURCE":
					return ROMResourceElement;
				case "REQUEST":
					return ROMRequestElement;
				case "PARAM":
					return ROMParamElement;
				case "RESPONSE":
					return ROMResponseElement;
				case "ELEMENT":
					return ROMElementElement;
				case "VECTOR":
					return ROMVectorElement;
				case "ATTRIBUTE":
					return ROMAttributeElement;
				default:
					return ROMElement;
			}
		} else {
			return null;
		}
	}
	_xml;
	_dom;
	constructor(tree) {
		super();
		this._xml = new ROMInstruction();
		this._dom = new ROMElement({
			tree,
			parentNode: ROMDocument,
			previousElementSibling: ROMInstruction
		});
		this.isConnected = true;
		this.childNodes = [ROMInstruction, this._dom.constructor];
		this.documentElement = this._dom;
		this.xmlDeclarations = [this._xml];
	}
}
