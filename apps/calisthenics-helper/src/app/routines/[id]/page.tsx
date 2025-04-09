import { Metadata } from 'next';
import RoutineDetail from '@/components/routine/routine-detail/RoutineDetail';

export const metadata: Metadata = {
	title: '루틴 상세보기',
};

type Props = {
	params: Promise<{ id: string }>;
};

export default async function RoutinePage({ params }: Props) {
	const id = (await params).id;

	return (
		<>
			<RoutineDetail id={id} />
		</>
	);
}
