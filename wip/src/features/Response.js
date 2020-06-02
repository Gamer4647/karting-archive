// @flow
import {createAction, createReducer} from "@reduxjs/toolkit";
import {Id, Message, Tags} from "./../common/constants.js";
import type {State, Action, Store} from "./../common/redux.js";
import {prepareAction} from "./../common/redux.js";
import {
	ROMResourceElement,
	ROMResponseElement,
	ROMVectorElement,
	ROMElementElement,
	ROMAttributeElement
} from "./../ROM/ROMElements.js";
export default class {
	response: ROMResponseElement;
	_actions = Object.create(null);
	_reducer = createReducer([], {});
	constructor(response: ROMResourceElement) {
		let actions;
		this.response = response.response;
		this._actions = actions = {
			startElement: createAction("response/START_ELEMENT", prepareAction),
			writeElement: createAction("response/WRITE_ELEMENT", prepareAction),
			endElement: createAction("response/END_ELEMENT", prepareAction),
			writeAttribute: createAction("response/WRITE_ATTRIBUTE", prepareAction),
			endDocument: createAction("response/END_DOCUMENT", prepareAction),
			startForEach: createAction("response/START_FOR_EACH", prepareAction),
			endForEach: createAction("response/END_FOR_EACH", prepareAction)
		};
		this._reducer = createReducer([], {
			[actions.startElement]: (s: State, a: Action) => void s.push(a),
			[actions.writeElement]: (s: State, a: Action) => void s.push(a),
			[actions.endElement]: (s: State, a: Action) => void s.push(a),
			[actions.writeAttribute]: (s: State, a: Action) => void s.push(a),
			[actions.endDocument]: (s: State, a: Action) => void s.push(a),
			[actions.startForEach]: (s: State, a: Action) => void s.push(a),
			[actions.endForEach]: (s: State, a: Action) => void s.push(a)
		});
	}
	get actions() {
		return this._actions;
	}
	get reducer() {
		return this._reducer;
	}
	generate(store: Store) {
		const {
				startElement,
				writeElement,
				endElement,
				writeAttribute,
				endDocument,
				startForEach,
				endForEach
			} = this._actions,
			{response} = this,
			id = Id.SUCCESSFUL_COMPLETION,
			message = Message.SUCCESSFUL_COMPLETION;
		/*store.dispatch(prepare(PDO.PREPARE));
		store.dispatch(execute(PDO.EXECUTE));
		store.dispatch(startWhile(PDO.FETCH_OBJ));
		store.dispatch(endWhile());*/
		store.dispatch(startElement(Tags.RESULT));
		store.dispatch(startElement(Tags.STATUS));
		store.dispatch(writeElement(Tags.ID, id));
		store.dispatch(writeElement(Tags.MESSAGE, message));
		store.dispatch(endElement(Tags.STATUS));
		store.dispatch(startElement(response.name));
		response.children.forEach(function $children(child) {
			switch (child.constructor) {
				case ROMVectorElement: {
					store.dispatch(startForEach());
				}
				case ROMElementElement: {
					store.dispatch(startElement(child.name));
					child.children.forEach($children);
					store.dispatch(endElement(child.name));
					if (child instanceof ROMVectorElement) {
						store.dispatch(endForEach());
					}
					break;
				}
				case ROMAttributeElement: {
					store.dispatch(writeAttribute(child.name));
					break;
				}
				default:
			}
		});
		store.dispatch(endElement(response.name));
		store.dispatch(endElement(Tags.RESULT));
		store.dispatch(endDocument());
	}
}
