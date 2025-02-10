export function getUnixTime(addSeconds?: number): number {
	if (!addSeconds) {
		return Date.now();
	}

	return new Date(Date.now() + secondsToMilliSeconds(addSeconds)).getTime();
}

export function convertUnixTimeToSeconds(unixTime: number): number {
	return millisecondsToSeconds(unixTime);
}

export function getRemainSecondsFromUnixTime(unixTime: number): number {
	return Math.max(0, millisecondsToSeconds(unixTime - getUnixTime()));
}

function millisecondsToSeconds(milliseconds: number) {
	return milliseconds / 1000;
}

function secondsToMilliSeconds(seconds: number) {
	return seconds * 1000;
}
