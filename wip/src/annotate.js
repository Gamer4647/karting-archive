export default class $TypeError extends Error {
	REFERENCE_UNDEFINED = 0x01;
	MISMATCH_TYPE_STRING = 0x02;
	MISMATCH_TYPE_BOOLEAN = 0x03;
	MISMATCH_TYPE_NUMBER = 0x04;
	STRING_EMPTY_TEXT = 0x05;
	BAD_IDENTIFIER_NAME = 0x06;
	constructor(string, state) {
		super();
		switch (state) {
		}
	}
}
