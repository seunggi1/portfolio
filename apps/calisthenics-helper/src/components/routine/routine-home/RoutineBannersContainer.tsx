import { createRoutineBusiness } from '@/business';
import { RecommandRoutine } from '@/types/routine';
import RoutineBanners from './RoutineBanners';

export const revalidate = 3600;

export default async function RoutineBannersContainer() {
	const routineBusiness = await createRoutineBusiness();
	const recommandRoutines: RecommandRoutine[] =
		await routineBusiness.getRecommandRoutines();
	return <RoutineBanners recommandRoutines={recommandRoutines} />;
}
