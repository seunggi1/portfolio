import { Metadata } from 'next';
import RoutineRunMain from '@/components/routine/routine-run/RoutineRunMain';

export const metadata: Metadata = {
	title: '루틴 실행',
};

type Props = {
	params: Promise<{ id: string }>;
};

export default async function RunPage({ params }: Props) {
	const { id } = await params;

	return (
		<>
			<RoutineRunMain id={id} />
		</>
	);
}
