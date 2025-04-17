import CategoryFilterContainer from './CategoryFilterContainer';
import RoutineBannersContainer from './RoutineBannersContainer';
import RoutineCardContainer from './RoutineCardsContainer';

export default function Routines() {
	return (
		<>
			<RoutineBannersContainer />
			<CategoryFilterContainer />
			<RoutineCardContainer />
		</>
	);
}
