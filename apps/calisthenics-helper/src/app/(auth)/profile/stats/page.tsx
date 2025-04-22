import { redirect } from 'next/navigation';
import { Metadata } from 'next';
import { createRoutineBusiness } from '@/business';
import MyStats from '@/components/auth/profile/MyStats';
import { UnauthorizedError } from '@/types/error';
import { UserStatsResult } from '@/types/routine';
import { addDay, getDateString } from '@/utils/time';
import { myStatsSearchParam } from '@/constants/profiles';

export const metadata: Metadata = {
	title: '운동 통계',
};

type SearchParams = Promise<{ [key: string]: string | undefined }>;

export default async function MyStatsPage({
	searchParams,
}: {
	searchParams: SearchParams;
}) {
	const params = await searchParams;

	const startDate =
		params[myStatsSearchParam.startDate] ??
		getDateString(addDay(new Date(), -7));
	const endDate =
		params[myStatsSearchParam.endDate] ?? getDateString(new Date());

	let stats: UserStatsResult[] = [];

	try {
		const routineBusiness = await createRoutineBusiness();
		stats = await routineBusiness.getUserStats({
			startDate,
			endDate,
		});
	} catch (error) {
		if (error instanceof UnauthorizedError) {
			redirect('/403');
		} else {
			throw error;
		}
	}

	return <MyStats stats={stats} startDate={startDate} endDate={endDate} />;
}
