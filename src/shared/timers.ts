interface routine {
	wrap: (method: any) => any;
	yield: () => void;
}

function setTimeout(done: () => void, ms: number): routine {
	const routine: routine = coroutine;
	routine.wrap(() => {
		wait(ms/1000);
		done();
	})();
	return routine as routine;
}

function setInterval(done: () => void, ms: number): routine {
	const routine: routine = coroutine;
	routine.wrap(() => {
		while (true) {
			wait(ms/1000);
			done();
		}
	})();
	return routine;
}


function setImmediate(done: () => void): routine {
	const routine: routine = coroutine;
	routine.wrap(() => {
		while (true) {
			wait(1/1000);
			done();
		}
	})();
	return routine;
}

function clearInterval(routine: routine) : void {
	routine.yield();
}

export { setTimeout, setInterval, clearInterval };
export type { routine };
