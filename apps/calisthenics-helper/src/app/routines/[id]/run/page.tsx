import RoutineRun from '@/components/routine/RoutineRun';

type Props = {
	params: Promise<{ id: string }>;
};

export default async function RunPage({ params }: Props) {
	const { id } = await params;

	return (
		<>
			<RoutineRun id={id} />
		</>
	);
}
