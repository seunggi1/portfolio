import RecommandRoutineBanner from '@/components/routine/RecommandRoutineBanner';
import RoutineFilterTab from '@/components/routine/RoutineFilterTab';
import RoutineList from '@/components/routine/RoutineList';

export default function HomePage() {
	return (
		<>
			<RecommandRoutineBanner />
			<RoutineFilterTab />
			<RoutineList />
		</>
	);
}
