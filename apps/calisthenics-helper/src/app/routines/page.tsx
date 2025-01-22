import RecommandRoutineBanner from '@/components/routine/RecommandRoutineBanner';
import RoutineFilterTab from '@/components/routine/RoutineFilterTab';
import RoutineList from '@/components/routine/RoutineList';

export default function RoutinePage() {
	return (
		<section>
			<RecommandRoutineBanner />
			<RoutineFilterTab />
			<RoutineList />
		</section>
	);
}
