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

function secondsToBeforeDateString(seconds: number) {
	const MINUTE = 60;
	const HOUR = MINUTE * 60;
	const DAY = HOUR * 24;
	const WEEK = DAY * 7;
	const MONTH = WEEK * 4;
	const YEAR = MONTH * 12;

	if (seconds >= YEAR) {
		return `${Math.floor(seconds / YEAR)}년 전`;
	} else if (seconds >= MONTH) {
		return `${Math.floor(seconds / MONTH)}달 전`;
	} else if (seconds >= WEEK) {
		return `${Math.floor(seconds / MONTH)}주 전`;
	} else if (seconds >= DAY) {
		return `${Math.floor(seconds / DAY)}일 전`;
	} else if (seconds >= HOUR) {
		return `${Math.floor(seconds / HOUR)}시간 전`;
	} else {
		return `${Math.floor(seconds / MINUTE)}분 전`;
	}
}

export function getBeforeDate(dateString: string) {
	const date = new Date(dateString);

	const afterSeconds = convertUnixTimeToSeconds(Date.now() - date.getTime());

	return secondsToBeforeDateString(afterSeconds);
}
