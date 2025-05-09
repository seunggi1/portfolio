import { NewRoutineBase, RoutineCategory } from '@/types/routine';
import RoutineEditFormHeading from './RoutineEditFormHeading';
import {
	FormGroup,
	Pre,
	PreviewImage,
	RoutineCategories,
	RoutineLevel,
} from '@/components/common/ui';

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
			<FormGroup displayName="루틴이름">
				<p>{routine.name}</p>
			</FormGroup>
			<FormGroup displayName="루틴 설명">
				<Pre>{routine.description}</Pre>
			</FormGroup>
			<FormGroup displayName="루틴 이미지">
				{routine.image && <PreviewImage image={routine.image} />}
			</FormGroup>
			<FormGroup displayName="루틴 난이도">
				<RoutineLevel level={routine.difficultyLevel} />
			</FormGroup>
			<FormGroup displayName="휴식시간">
				<p>{routine.restSeconds}초</p>
			</FormGroup>
			<FormGroup displayName="세트 수">
				<p>{routine.totalSets}</p>
			</FormGroup>
			<FormGroup displayName="루틴 카테고리">
				<RoutineCategories
					categoryNames={routineCategories
						.filter((c) => routine.categoryIDs.includes(c.id))
						.map((c) => c.name)}
				/>
			</FormGroup>
		</>
	);
}
