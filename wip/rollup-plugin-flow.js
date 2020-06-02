import {createFilter} from "rollup-pluginutils";
import flowRemoveTypes from "flow-remove-types";

export default function(options = {}) {
	const filter = createFilter(options.include, options.exclude);

	return {
		name: "flow-remove-types",
		transform(code, id) {
			if (!filter(id)) return;
			const stripped = flowRemoveTypes(code, {all: true});

			return {
				code: stripped.toString(),
				map: stripped.generateMap()
			};
		}
	}
};
