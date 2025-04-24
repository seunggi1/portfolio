import { addDay, getDateString } from '@/util/time';

export const DEFAULT_DATE = {
	start: getDateString(addDay(new Date(), -30)),
	end: getDateString(new Date()),
};
