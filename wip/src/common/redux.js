// @flow
import crypto from "crypto";
export type Store = $ReadOnly<{|
	dispatch<T>(T): T
|}>;
export type Payload = $ReadOnly<{
	name: string,
	...
}>;
export type Action = $ReadOnly<{|
	payload?: Payload,
	error?: boolean,
	meta?: {...}
|}>;
export type State = Array<Action | void>;
export const guid = (function*(): Generator<string, void, void> {
	const cached = [];
	while (true) {
		yield (function(cached): string {
			let guid,
				b = Buffer.allocUnsafe(8);
			do {
				guid = crypto.randomFillSync(b).toString("hex");
			} while (cached.includes(guid));
			cached.push(guid);
			return guid;
		})(cached);
	}
})();
export function prepareAction(name: string, value: string): Action {
	return {
		meta: {
			guid: guid.next().value
		},
		payload: {
			name: name || null, value: value || null
		}
	};
}
