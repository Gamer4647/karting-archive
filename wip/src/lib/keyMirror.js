export default function(o) {
	const r = {};
	if (!(o instanceof Object && !Array.isArray(o)))
		throw new Error("keyMirror(o): Argument must be a nobject.");
	for (const k in o) if (o.hasOwnProperty(k)) r[k] = k;
	return Object.freeze(r);
}
