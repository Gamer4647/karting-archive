import babel from "rollup-plugin-babel";
import flow from "./rollup-plugin-flow.js";
export default {
	input: "./src/index.js",
	output: {
		dir: "dist",
		format: "cjs"
	},
	external: ["fs", "strip-bom", "xml-js", "consola", "chalk", "entities", "@reduxjs/toolkit", "crypto"],
	plugins: [flow(), babel({
		babelrc: false, plugins: ["@babel/plugin-proposal-class-properties"]
	})]
}
