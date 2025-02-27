import RoutineRunMain from '@/components/routine/routine-run/RoutineRunMain';

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
