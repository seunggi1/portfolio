import RoutineDetail from '@/components/routine/RoutineDetail';

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
