import {
	convertUnixTimeToSeconds,
	getRemainSecondsFromUnixTime,
	getUnixTime,
} from '@/utils/time';
import { describe, expect, it, vi } from 'vitest';

describe('time util test', () => {
	it('correct unixTime type', () => {
		expect(getUnixTime()).toBeTypeOf('number');
	});

	it('cannot remain seconds to negative', () => {
		const currentTime = getUnixTime();
		vi.useFakeTimers();
		vi.advanceTimersByTime(2000);
		const remain = getRemainSecondsFromUnixTime(currentTime);
		expect(remain).toBeGreaterThanOrEqual(0);
	});
});
