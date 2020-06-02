export class Node {
	static ELEMENT_NODE = 1;
	static ATTRIBUTE_NODE = 2;
	static TEXT_NODE = 3;
	static CDATA_SECTION_NODE = 4;
	static PROCESSING_INSTRUCTION_NODE = 7;
	static COMMENT_NODE = 8;
	static DOCUMENT_NODE = 9;
	static DOCUMENT_TYPE_NODE = 10;
	static DOCUMENT_FRAGMENT_NODE = 11;
	nodeType = Node.DOCUMENT_NODE;
	nodeName = "#document";
	baseURI = "about:blank";
	isConnected = false;
	ownerDocument = null;
	getRootNode() {
		return null;
	}
	parentNode = null;
	hasChildNodes() {
		return false;
	}
	childNodes = [];
	nodeValue = null;
	textContent = null;
	contains(other) {
		return false;
	}
}
