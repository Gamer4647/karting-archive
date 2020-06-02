'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var fs = _interopDefault(require('fs'));
var stripBOM = _interopDefault(require('strip-bom'));
var domParser = _interopDefault(require('xml-js'));
var consola = _interopDefault(require('consola'));
var chalk = _interopDefault(require('chalk'));
var toolkit = require('@reduxjs/toolkit');
var entities = require('entities');
var crypto = _interopDefault(require('crypto'));

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

class Node {
  constructor() {
    _defineProperty(this, "nodeType", Node.DOCUMENT_NODE);

    _defineProperty(this, "nodeName", "#document");

    _defineProperty(this, "baseURI", "about:blank");

    _defineProperty(this, "isConnected", false);

    _defineProperty(this, "ownerDocument", null);

    _defineProperty(this, "parentNode", null);

    _defineProperty(this, "childNodes", []);

    _defineProperty(this, "nodeValue", null);

    _defineProperty(this, "textContent", null);
  }

  getRootNode() {
    return null;
  }

  hasChildNodes() {
    return false;
  }

  contains(other) {
    return false;
  }

}

_defineProperty(Node, "ELEMENT_NODE", 1);

_defineProperty(Node, "ATTRIBUTE_NODE", 2);

_defineProperty(Node, "TEXT_NODE", 3);

_defineProperty(Node, "CDATA_SECTION_NODE", 4);

_defineProperty(Node, "PROCESSING_INSTRUCTION_NODE", 7);

_defineProperty(Node, "COMMENT_NODE", 8);

_defineProperty(Node, "DOCUMENT_NODE", 9);

_defineProperty(Node, "DOCUMENT_TYPE_NODE", 10);

_defineProperty(Node, "DOCUMENT_FRAGMENT_NODE", 11);

class Attr extends Node {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "nodeType", Node.ATTRIBUTE_NODE);

    _defineProperty(this, "nodeName", null);
  }

}

_defineProperty(Attr, "ATTRIBUTES_SYMBOL", "#attributes");

function isDefined(reference) {
  return reference === undefined ? false : reference === null ? false : !Number.isNaN(reference);
}
function isString(reference) {
  return typeof reference === "string";
}
function isBoolean(reference) {
  return typeof reference === "boolean";
}
function toBoolean(string = "") {
  return new RegExp(/(?:^|^[\s\u{FEFF}\xA0]*)(true)(?:[\s\u{FEFF}\xA0]*$|$)/u).test(string);
}
function toSymKey(string = "") {
  if (new RegExp(/(?:^|^[\s\u{FEFF}\xA0]*)([$a-z-_][$a-z0-9-_]*(\[[$a-z-_][$a-z0-9-_]*\])*)(?:[\s\u{FEFF}\xA0]*$|$)/iu).test(string)) {
    string = string.trim().toUpperCase().replace(/-/g, "_").split("[");
    return string[string.length - 1].replace(/\]$/g, "");
  } else {
    return null;
  }
}
function sanitize(markup = "") {
  markup = entities.decodeHTML(markup);
  return markup;
}

class $TypeError extends Error {
  constructor(string, state) {
    super();

    _defineProperty(this, "REFERENCE_UNDEFINED", 0x01);

    _defineProperty(this, "MISMATCH_TYPE_STRING", 0x02);

    _defineProperty(this, "MISMATCH_TYPE_BOOLEAN", 0x03);

    _defineProperty(this, "MISMATCH_TYPE_NUMBER", 0x04);

    _defineProperty(this, "STRING_EMPTY_TEXT", 0x05);

    _defineProperty(this, "BAD_IDENTIFIER_NAME", 0x06);
  }

}

var _ = {
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

  $isString(value, {
    identifier: identifier
  } = {
    identifier: false
  }) {
    if (!isDefined(value)) throw new $TypeError({
      string: value,
      state: $TypeError.REFERENCE_UNDEFINED
    });
    if (!isString(value)) throw new $TypeError({
      string: value,
      state: $TypeError.MISMATCH_TYPE_STRING
    });
    if (!value.trim()) throw new $TypeError({
      string: value,
      state: $TypeError.STRING_EMPTY_TEXT
    });
    if (identifier && !toSymKey(value)) throw new $TypeError({
      string: value,
      state: $TypeError.BAD_IDENTIFIER_NAME
    });
    return null;
  },

  $isBoolean(value) {
    if (!isDefined(value)) throw new $TypeError({
      string: value,
      state: $TypeError.REFERENCE_UNDEFINED
    });
    if (!isBoolean(value)) throw new $TypeError({
      string: value,
      state: $TypeError.MISMATCH_TYPE_BOOLEAN
    });
    return null;
  },

  $isNumber(value) {
    if (!isDefined(value)) throw new $TypeError({
      string: value,
      state: $TypeError.REFERENCE_UNDEFINED
    });
    if (!Number.isFinite(value)) throw new $TypeError({
      string: value,
      state: $TypeError.MISMATCH_TYPE_NUMBER
    });
    return null;
  },

  PHP: function ({
    short_tags
  }) {
    this.$isBoolean(short_tags);
    return short_tags ? `<?${this.LF}` : `<?php${this.LF}`;
  },
  LI: function (string) {
    this.$isString(string, {
      identifier: true
    });
    string = toSymKey(string).toLowerCase();
    return `$${string} = `;
  },
  LOAD: function (string) {
    this.$isString(string, {
      identifier: true
    });
    string = toSymKey(string).toLowerCase();
    return `$${string}`;
  },
  TEXT: function (string) {
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
  CAST: function (string) {
    if (!isDefined(string)) throw new $TypeError({
      string,
      state: $TypeError.REFERENCE_UNDEFINED
    });

    if (!isNaN(parseFloat(String(string).replace(/^[!\^~]/gu, ""))) && isFinite(String(string).replace(/^[!\^~]/gu, ""))) {
      return String(string);
    } else {
      this.$isString(string);
      return this.TEXT(string);
    }
  },
  CONS: function (string) {
    this.$isString(string, {
      identifier: true
    });
    string = toSymKey(string);
    this.IMPORTS = [...this.IMPORTS, string];
    return string;
  },
  CALL: function (string, argvs) {
    this.$isString(string);
    this.$isString(argvs);
    return argvs === this.NOP ? `${string}()` : `${string}(${argvs})`;
  },
  NULLCO: function (string) {
    this.$isString(string);
    return ` ?? ${string}`;
  },
  TNE: function (string) {
    this.$isString(string, {
      identifier: true
    });
    string = toSymKey(string);
    return `new NookinException(${string})`;
  },
  DEC: function (string, argvs) {
    this.$isString(string, {
      identifier: true
    });
    this.$isString(String(argvs));
    string = toSymKey(string);
    return this.CALL("declare", `${string} = ${this.CAST(argvs)}`);
  },
  INC: function (string) {
    this.$isString(string);
    return "";
  },
  USE: function (string) {
    this.$isString(string);
    return "";
  },
  BIT: function (bcbit) {
    this.$isBoolean(bcbit);
    return bcbit ? "true" : "false";
  },
  ENUM: function (string) {
    this.$isString(string, {
      identifier: true
    });
    string = toSymKey(string);
    return `Options::${string}`;
  },
  CLO: function (string) {
    this.$isString(string);
    return `(${string})`;
  },
  IF: function (string, bcif, {
    $if: $if
  } = {
    $if: "if"
  }) {
    this.$isString(string);
    this.$isString(bcif);
    this.$isString($if);
    let $LF = this.LF;
    bcif = bcif.trim().split($LF).join(`${$LF}${this.INDENT}`).trimEnd();
    return `${$if} (${string}) {${$LF}${this.INDENT}${bcif}${$LF}}${$LF}`;
  },
  IFE: function (string, bcif, bcife, {
    $if: $if,
    $else: $else
  } = {
    $if: "if",
    $else: "else"
  }) {
    this.$isString(string);
    this.$isString(bcif);
    this.$isString(bcife);
    this.$isString($if);
    this.$isString($else);
    let $LF = this.LF;
    bcif = bcif.trim().split($LF).join(`${$LF}${this.INDENT}`).trimEnd();
    bcife = bcife.trim().split($LF).join(`${$LF}${this.INDENT}`).trimEnd();
    return `${$if} (${string}) {${$LF}${this.INDENT}${bcif}${$LF}} ${$else} {${$LF}${this.INDENT}${bcife}${$LF}}${$LF}`;
  },
  INT: function (bcint) {
    this.$isNumber(bcint);
    return this.INDENT.repeat(Math.max(0, bcint));
  }
};

var types = {
  VOID: Symbol.for("Void"),
  ANCHOR: Symbol.for("Anchor"),
  STRING: Symbol.for("String"),
  ARRAY: Symbol.for("Array"),
  INTEGER: Symbol.for("Integer"),
  DECIMAL: Symbol.for("Decimal"),
  FLOAT: Symbol.for("Float"),
  BOOLEAN: Symbol.for("Boolean"),
  DATETIME: Symbol.for("Datetime"),
  BINARY: Symbol.for("Binary"),
  FILE: Symbol.for("File")
};

var snippets = {
  pagination() {
    let c = "";
    c += _.LI("page").concat(_.CALL("min", _.CALL("max", _.CAST(1).concat(_.ARGV, _.CALL("Request::getInteger", _.TEXT("page")).concat(_.NULLCO(_.CAST(1))))).concat(_.ARGV, _.CAST(65535))).concat(_.NOP));
    c += _.LI("per_page").concat(_.CALL("min", _.CALL("max", _.CAST(0).concat(_.ARGV, _.CALL("Request::getInteger", _.TEXT("per_page")).concat(_.NULLCO(_.CAST(255))))).concat(_.ARGV, _.CAST(255))).concat(_.NOP));
    c += _.LI("limit").concat(_.CALL("min", _.CALL("max", _.CAST(0).concat(_.ARGV, _.CALL("Request::getInteger", _.TEXT("limit")).concat(_.NULLCO(_.CAST(65535))))).concat(_.ARGV, _.CAST(65535))).concat(_.NOP));
    c += _.LI("pagination").concat(_.NEW, _.CALL("Pagination", _.LOAD("page").concat(_.ARGV, _.LOAD("per_page"), _.ARGV, _.LOAD("limit"))), _.NOP);
    return c;
  },

  setEnum(fields) {
    let c = "";
    const {
      name
    } = fields;
    c += _.IF(_.NOT.concat(_.CALL("in_array", _.LOAD(name).concat(_.ARGV, _.ENUM(_.CONS(name)), _.ARGV, _.BIT(true)))), _.TNE("HTTP_FIELD_ENUM_RANGE").concat(_.NOP));
    return c;
  },

  setClamp(snippet, fields) {
    let c = "";
    const {
      name,
      type,
      minvalue,
      maxvalue
    } = fields;

    if (!isDefined(minvalue) && isDefined(maxvalue)) {
      c += _.LI(name).concat(_.CALL("min", _.CALL("max", _.CAST(0).concat(_.ARGV, _.CALL(`Request::get${type.description}`, _.TEXT(name)))).concat(_.ARGV, _.CAST(maxvalue))).concat(_.NOP));
    } else if (isDefined(minvalue) && !isDefined(maxvalue)) {
      c += _.LI(name).concat(_.CALL("min", _.CALL("max", _.CAST(minvalue).concat(_.ARGV, _.CALL(`Request::get${type.description}`, _.TEXT(name)))).concat(_.ARGV, _.CAST(_.MAX))).concat(_.NOP));
    } else if (isDefined(minvalue) && isDefined(maxvalue)) {
      c += _.LI(name).concat(_.CALL("min", _.CALL("max", _.CAST(minvalue).concat(_.ARGV, _.CALL(`Request::get${type.description}`, _.TEXT(name)))).concat(_.ARGV, _.CAST(maxvalue))).concat(_.NOP));
    } else {
      c += _.LI(name).concat(_.CALL("min", _.CALL("max", _.CAST(0).concat(_.ARGV, _.CALL(`Request::get${type.description}`, _.TEXT(name)))).concat(_.ARGV, _.CAST(_.MAX))).concat(_.NOP));
    }

    return _.IFE(_.CALL(`Request::get${type.description}`, _.TEXT(name)).concat(_.NEQV, _.NULL), c, snippet.concat(_.NOP));
  },

  setLength(snippet, fields) {
    const {
      name,
      type,
      minlength,
      maxlength
    } = fields;

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
    writeElement(indent, name, {
      value,
      key: key
    } = {
      key: "row"
    }) {
      name = _.TEXT(name);
      value = value ? value : `${_.LOAD(key)}[${name}]`;
      return `${indent}${_.CALL("$response->writeElement", `${name}${_.ARGV}${value}`)}${_.NOP}`;
    },

    writeAttribute(indent, name, {
      value,
      key: key
    } = {
      key: "row"
    }) {
      name = _.TEXT(name);
      value = value ? value : `${_.LOAD(key)}[${name}]`;
      return `${indent}${_.CALL("$response->writeAttribute", `${name}${_.ARGV}${value}`)}${_.NOP}`;
    },

    startElement(indent, name) {
      return `${indent}${_.CALL("$response->startElement", _.TEXT(name))}${_.NOP}`;
    },

    endElement(indent, name) {
      return `${indent}${_.CALL("$response->endElement", _.NOP)}${_.NOP}`;
    },

    endDocument(indent, name) {
      return `${indent}${_.CALL("$response->endDocument", _.NOP)}${_.NOP}`;
    }

  }
};

class Document extends Node {
  constructor() {
    super();

    _defineProperty(this, "documentElement", null);

    _defineProperty(this, "xmlDeclarations", []);

    _defineProperty(this, "implementation", null);

    _defineProperty(this, "xmlnsURI", null);

    this.implementation = this.constructor;
  }

}

class ROMInstruction extends Node {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "nodeType", Node.PROCESSING_INSTRUCTION_NODE);

    _defineProperty(this, "version", 1);

    _defineProperty(this, "encoding", "UTF-8");

    _defineProperty(this, "standalone", true);

    _defineProperty(this, "nodeName", "XML");

    _defineProperty(this, "isConnected", true);

    _defineProperty(this, "ownerDocument", ROMDocument);

    _defineProperty(this, "parentNode", ROMDocument);
  }

}

class Element extends Node {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "nodeType", Node.ELEMENT_NODE);

    _defineProperty(this, "namespaceURI", null);

    _defineProperty(this, "localName", "node");

    _defineProperty(this, "tagName", "NODE");

    _defineProperty(this, "attributes", []);

    _defineProperty(this, "children", []);

    _defineProperty(this, "firstElementChild", null);

    _defineProperty(this, "lastElementChild", null);

    _defineProperty(this, "childElementCount", 0);

    _defineProperty(this, "previousElementSibling", null);

    _defineProperty(this, "nextElementSibling", null);
  }

  hasAttributes() {
    return false;
  }

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

}

class ROMElement extends Element {
  getRootNode() {
    return ROMDocument;
  }

  hasChildNodes() {
    return !!this.childElementCount;
  }

  contains(other) {
    return !!this.children.filter(child => child.constructor === ROMDocument.createAbstract(other));
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
    return this.children.filter(child => child.constructor === ROMDocument.createAbstract(name));
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

    _defineProperty(this, "namespaceURI", "http://frenchtoast.dev/ns");

    let $tree = tree,
        details = [],
        children = [];

    for (let sub in $tree) {
      if (sub !== Attr.ATTRIBUTES_SYMBOL) {
        $tree[sub].forEach(innerTree => {
          details = [...details, [sub, innerTree]];
        });
      }
    }

    for (let d = 0; d < details.length; d++) {
      let previousSibling = details[d - 1] || [],
          nextSibling = details[d + 1] || [];
      children = [...children, new (ROMDocument.createAbstract(details[d][0]))({
        tree: details[d][1],
        parentNode: this.constructor,
        previousElementSibling: ROMDocument.createAbstract(previousSibling[0]),
        nextElementSibling: ROMDocument.createAbstract(nextSibling[0]),
        tagName: details[d][0]
      })];
    }

    this.isConnected = true;
    this.ownerDocument = ROMDocument;
    this.parentNode = parentNode || null;
    this.childNodes = children.map(child => child.constructor);
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

class ROMResourceElement extends ROMElement {}
class ROMRequestElement extends ROMElement {}
class ROMParamElement extends ROMElement {}
class ROMResponseElement extends ROMElement {}
class ROMElementElement extends ROMElement {}
class ROMVectorElement extends ROMElement {}
class ROMAttributeElement extends ROMElement {}

class ROMDocument extends Document {
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

  constructor(tree) {
    super();

    _defineProperty(this, "xmlnsURI", "http://frenchtoast.dev/ns");

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

function k (o) {
  const r = {};
  if (!(o instanceof Object && !Array.isArray(o))) throw new Error("keyMirror(o): Argument must be a nobject.");

  for (const k in o) if (o.hasOwnProperty(k)) r[k] = k;

  return Object.freeze(r);
}

const Id = {
  SUCCESSFUL_COMPLETION: 0
};
const Message = {
  SUCCESSFUL_COMPLETION: "Successful completion"
};
const Tags = k({
  RESULT: null,
  STATUS: null,
  ID: null,
  MESSAGE: null
});

//      
const guid = function* () {
  const cached = [];

  while (true) {
    yield function (cached) {
      let guid,
          b = Buffer.allocUnsafe(8);

      do {
        guid = crypto.randomFillSync(b).toString("hex");
      } while (cached.includes(guid));

      cached.push(guid);
      return guid;
    }(cached);
  }
}();
function prepareAction(name, value) {
  return {
    meta: {
      guid: guid.next().value
    },
    payload: {
      name: name || null,
      value: value || null
    }
  };
}

class Response {
  constructor(response) {
    _defineProperty(this, "_actions", Object.create(null));

    _defineProperty(this, "_reducer", toolkit.createReducer([], {}));

    let actions;
    this.response = response.response;
    this._actions = actions = {
      startElement: toolkit.createAction("response/START_ELEMENT", prepareAction),
      writeElement: toolkit.createAction("response/WRITE_ELEMENT", prepareAction),
      endElement: toolkit.createAction("response/END_ELEMENT", prepareAction),
      writeAttribute: toolkit.createAction("response/WRITE_ATTRIBUTE", prepareAction),
      endDocument: toolkit.createAction("response/END_DOCUMENT", prepareAction),
      startForEach: toolkit.createAction("response/START_FOR_EACH", prepareAction),
      endForEach: toolkit.createAction("response/END_FOR_EACH", prepareAction)
    };
    this._reducer = toolkit.createReducer([], {
      [actions.startElement]: (s, a) => void s.push(a),
      [actions.writeElement]: (s, a) => void s.push(a),
      [actions.endElement]: (s, a) => void s.push(a),
      [actions.writeAttribute]: (s, a) => void s.push(a),
      [actions.endDocument]: (s, a) => void s.push(a),
      [actions.startForEach]: (s, a) => void s.push(a),
      [actions.endForEach]: (s, a) => void s.push(a)
    });
  }

  get actions() {
    return this._actions;
  }

  get reducer() {
    return this._reducer;
  }

  generate(store) {
    const {
      startElement,
      writeElement,
      endElement,
      writeAttribute,
      endDocument,
      startForEach,
      endForEach
    } = this._actions,
          {
      response
    } = this,
          id = Id.SUCCESSFUL_COMPLETION,
          message = Message.SUCCESSFUL_COMPLETION;
    let select = [];
    store.dispatch(startElement(Tags.RESULT));
    store.dispatch(startElement(Tags.STATUS));
    store.dispatch(writeElement(Tags.ID, id));
    store.dispatch(writeElement(Tags.MESSAGE, message));
    store.dispatch(endElement(Tags.STATUS));
    store.dispatch(startElement(response.name));
    response.children.forEach(function $children(child) {
      switch (child.constructor) {
        case ROMVectorElement:
          {
            store.dispatch(startForEach());
          }

        case ROMElementElement:
          {
            store.dispatch(startElement(child.name));
            child.children.forEach($children);
            store.dispatch(endElement(child.name));

            if (child instanceof ROMVectorElement) {
              store.dispatch(endForEach());
            }

            break;
          }

        case ROMAttributeElement:
          {
            store.dispatch(writeAttribute(child.name));
            select.push(`\`${child.name}\``);
            break;
          }
      }
    });
    store.dispatch(endElement(response.name));
    store.dispatch(endElement(Tags.RESULT));
    store.dispatch(endDocument());
    console.log(select.join(', '));
  }

}

for (let file = 2; file < process.argv.length; file++) {
  try {
    let action;
    const b = process.argv[file].split('.')[process.argv[file].split('.').length - 2];

    switch (b) {
      case 'list':
      case 'latest':
      case 'view':
      case 'show':
      case 'bulk_fetch':
        action = 'SELECT';
        break;

      default:
        consola.info('>> ' + b);
        continue;
    } //process.exit(0);


    let schema = new ROMDocument(domParser.xml2js(stripBOM(fs.readFileSync(process.argv[file], "utf8")), {
      compact: true,
      trim: true,
      sanitize: false,
      nativeType: false,
      nativeTypeAttributes: false,
      addParent: false,
      alwaysArray: true,
      alwaysChildren: false,
      instructionHasAttributes: true,
      ignoreDeclaration: true,
      ignoreInstruction: true,
      ignoreAttributes: false,
      ignoreComment: true,
      ignoreCdata: true,
      ignoreDoctype: true,
      ignoreText: true,
      attributesKey: Attr.ATTRIBUTES_SYMBOL,
      elementNameFn: t => sanitize(t),
      attributeNameFn: t => sanitize(t),
      attributeValueFn: t => sanitize(t)
    })).documentElement.firstElementChild,
        c = `${_.DEC("strict_types", 1)}${_.NOP}`,
        params = schema.request.params,
        blacklistedNames = ["page", "per_page", "limit"],
        whitelistedProps = ["name", "type", "required", "default"];
    const sortKeys = new Intl.Collator("en", {
      localeMatcher: "lookup",
      usage: "sort",
      sensitivity: "variant",
      ignorePunctuation: false,
      numeric: true,
      caseFirst: "lower"
    });
    params.sort((a, b) => sortKeys.compare(a.name, b.name));

    for (const param of params) {
      if (blacklistedNames.includes(param.name)) continue;
      let {
        placeholder = param.attributes["default"],
        encoding,
        encryption,
        max_length,
        maxlength,
        maxvalue,
        minlength,
        minvalue,
        name,
        options,
        required = false,
        salt = false,
        type
      } = param.attributes;
      name = toSymKey(name).toLowerCase();
      type = types[toSymKey(type)] || Symbol.for("Void");
      required = toBoolean(required);
      salt = toBoolean(salt);
      let description = type.description;

      if (max_length) {
        consola.warn(chalk.yellow(`Usage of “max_length” on "${name}" (${description}) is DEPRECATED.
Avoid using it. Instead of “max_length”, please use “maxlength” (the alias of it).`));
      }

      let snippet;

      if (placeholder === "[session]") {
        snippet = _.CALL(`Cookie::get${description}`, _.TEXT(name));
      } else if (placeholder) {
        snippet = _.CAST(placeholder);
      } else if (required) {
        snippet = _.TNE("HTTP_FIELD_REQUIRED");
      } else if (!required) {
        snippet = _.NULL;
      }

      let conditionedType = type === Symbol.for("String") || type === Symbol.for("Integer");

      if (conditionedType && (placeholder || !required)) {
        snippet = `${_.LI(name)}${snippet}`;
      } else if (type === Symbol.for("Binary")) {
        snippet = `\n${_.INTENT}${snippet}`;
        c += _.LI(name).concat(_.CALL(`Request::get${type.description}`, _.TEXT(name)), _.ARGV, _.CONS("BASE64_ENCODING"), _.NULLCO(snippet), _.NOP);
      } else if (!conditionedType) {
        snippet = `\n${_.INTENT}${snippet}`;
        c += _.LI(name).concat(_.CALL(`Request::get${type.description}`, _.TEXT(name)), _.NULLCO(snippet), _.NOP);
      }

      switch (type) {
        case Symbol.for("String"):
          whitelistedProps = [...whitelistedProps, "encryption", "salt"];

          if (options) {
            whitelistedProps = [...whitelistedProps, "options"];
            c += snippets.setEnum({
              name
            });
          } else {
            whitelistedProps = [...whitelistedProps, "minlength", "maxlength", "max_length"];
            if (!maxlength && max_length) maxlength = max_length;
            if (minlength) minlength = Number(minlength);
            if (maxlength) maxlength = Number(maxlength);
            c += snippets.setLength(snippet, {
              name,
              type,
              minlength,
              maxlength
            });
          }

          break;

        case Symbol.for("Array"):
          whitelistedProps = [...whitelistedProps];
          break;

        case Symbol.for("Integer"):
          whitelistedProps = [...whitelistedProps, "minvalue", "maxvalue"];
          c += snippets.setClamp(snippet, {
            name,
            type,
            minvalue,
            maxvalue
          });
          break;

        case Symbol.for("Decimal"):
          whitelistedProps = [...whitelistedProps];
          break;

        case Symbol.for("Float"):
          whitelistedProps = [...whitelistedProps];
          break;

        case Symbol.for("Boolean"):
          whitelistedProps = [...whitelistedProps];
          break;

        case Symbol.for("Datetime"):
          whitelistedProps = [...whitelistedProps];
          break;

        case Symbol.for("Binary"):
          whitelistedProps = [...whitelistedProps, "encoding"];

          if (!encoding) {
            consola.warn(chalk.yellow(`Although optional, “encoding="base64"” on "${name}" (${description})
should be explicit — so that there's potential compatibility with clients
that don't have “base64” as the default encoding for type ${description}.
The game doesn't actually read this attribute at all, but we don't know if it
ever did at one point in development. Therefore, it is being kept.`));
          } else if (encoding !== "base64") {
            consola.warn(chalk.yellow(`The only accepted value for “encoding” on "${name}" (${description})
is “base64”. It's currently set to “${encoding}”. Which are not the same.
The game doesn't actually read this attribute at all, but we don't know if it
ever did at one point in development. Therefore, it is being kept.`));
          }

          break;

        case Symbol.for("File"):
          whitelistedProps = [...whitelistedProps];
          break;

        default:
      }

      let offending = [];

      for (const property in param.attributes) {
        if (!whitelistedProps.includes(property)) offending = [...offending, property];
      }

      if (offending.length) {
        throw new TypeError(`Some properties set on "${name}" (${description}) are not meant for this combo (${offending.join(", ")}).`);
      }
    }

    const response = new Response(schema);
    const store = toolkit.configureStore({
      reducer: response.reducer
    });
    response.generate(store); //consola.info(store.getState());
  } catch (e) {
    consola.error(e);
  }
}
