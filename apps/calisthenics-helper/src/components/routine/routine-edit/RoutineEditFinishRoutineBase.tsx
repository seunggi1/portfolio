import { NewRoutineBase, RoutineCategory } from '@/types/routine';
import RoutineEditFormHeading from './RoutineEditFormHeading';
import RoutineEditFormGroup from './RoutineEditFormGroup';
import RoutineLevel from '../ui/RoutineLevel';
import RoutineCategories from '../ui/RoutineCategories';

type Props = {
	routine: NewRoutineBase;
	routineCategories: RoutineCategory[];
};

export default function RoutineEditFinishRoutineBase({
	routine,
	routineCategories,
}: Props) {
	return (
		<>
			<RoutineEditFormHeading>루틴 기본정보</RoutineEditFormHeading>
			<RoutineEditFormGroup displayName="루틴이름">
				<p>{routine.name}</p>
			</RoutineEditFormGroup>
			<RoutineEditFormGroup displayName="루틴 설명">
				<p>{routine.description}</p>
			</RoutineEditFormGroup>
			<RoutineEditFormGroup displayName="루틴 난이도">
				<RoutineLevel level={routine.difficultyLevel} />
			</RoutineEditFormGroup>
			<RoutineEditFormGroup displayName="휴식시간">
				<p>{routine.restSeconds}초</p>
			</RoutineEditFormGroup>
			<RoutineEditFormGroup displayName="세트 수">
				<p>{routine.totalSets}</p>
			</RoutineEditFormGroup>
			<RoutineEditFormGroup displayName="루틴 카테고리">
				<RoutineCategories
					categoryNames={routineCategories
						.filter((c) => routine.categoryIDs.includes(c.id))
						.map((c) => c.name)}
				/>
			</RoutineEditFormGroup>
		</>
	);
}
