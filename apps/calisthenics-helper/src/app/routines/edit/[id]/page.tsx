import RoutineUpdateContainer from '@/components/routine/routine-edit/RoutineUpdateContainer';

type Props = {
	params: Promise<{ id: string }>;
};

export default async function RoutineUpdatePage({ params }: Props) {
	const { id } = await params;

	return <RoutineUpdateContainer routineID={id} />;
}
