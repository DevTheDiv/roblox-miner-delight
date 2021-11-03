export default {
	log: (...args: unknown[]) : void => print(...args),
	error: (...args: unknown[]) : void => print("error: ", ...args),
	warn: (...args: unknown[]) : void => warn(...args),
};
