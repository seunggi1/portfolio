import { getRecommandRoutines } from '@/business';
import { RecommandRoutine } from '@/types/routine';
import RoutineBanners from './RoutineBanners';

export const revalidate = 3600;

export default async function RoutineBannersContainer() {
	const recommandRoutines: RecommandRoutine[] = await getRecommandRoutines();
	return <RoutineBanners recommandRoutines={recommandRoutines} />;
}
