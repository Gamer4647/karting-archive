import {Node} from "./Node.js";
import {ROMDocument} from "./ROMDocument.js";
export class ROMInstruction extends Node {
	nodeType = Node.PROCESSING_INSTRUCTION_NODE;
	version = 1;
	encoding = "UTF-8";
	standalone = true;
	nodeName = "XML";
	isConnected = true;
	ownerDocument = ROMDocument;
	parentNode = ROMDocument;
}
