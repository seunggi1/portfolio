import { NewExercise } from '@/types/routine';
import ExeciseForm from './ExerciseForm';

type Props = {
	data: Partial<NewExercise>;
	onComplete: (exercise: NewExercise) => void;
};

export default function ExerciseEdit({ data, onComplete }: Props) {
	const handleExerciseSubmit = (newExercise: NewExercise) => {
		onComplete(newExercise);
	};

	return (
		<>
			<ExeciseForm defaultValue={data} onSubmit={handleExerciseSubmit} />
		</>
	);
}
