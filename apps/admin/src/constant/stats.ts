import { addDay, getDateString } from '@repo/utils';

export const DEFAULT_DATE = {
	start: getDateString(addDay(new Date(), -30)),
	end: getDateString(new Date()),
};
