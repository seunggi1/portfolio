import { useEffect, useState } from 'react';
import { ExerciseFormData, NewExercise } from '@/types/routine';
import ExeciseForm from './ExerciseForm';
import { validateExercise } from '@/schemas/routine';

type Props = {
	data?: Partial<NewExercise>;
	onComplete: (exercise: NewExercise) => void;
	onAddClick: () => void;
	onFinishClick: () => void;
};

export default function ExerciseEdit({
	data,
	onComplete,
	onAddClick,
	onFinishClick,
}: Props) {
	const [exerciseFormData, setExerciseFormData] = useState<
		Partial<ExerciseFormData>
	>({
		inputs: data,
	});

	useEffect(() => {
		setExerciseFormData((e) => ({ ...e, inputs: data }));
	}, [data]);

	const handleExerciseDataChange = (name: keyof NewExercise, value: string) => {
		if (name === 'name') {
			setExerciseFormData((r) => ({
				...r,
				inputs: { ...r.inputs, [name]: value },
			}));
		} else {
			setExerciseFormData((r) => ({
				...r,
				inputs: { ...r.inputs, [name]: !value ? undefined : +value },
			}));
		}
	};

	const handleExerciseSubmit = () => {
		const errors = validateExercise(exerciseFormData.inputs);

		if (errors) {
			return setExerciseFormData((e) => ({ ...e, errors }));
		}
		const exercise = exerciseFormData.inputs as NewExercise;
		onComplete(exercise);
		setExerciseFormData((e) => ({ ...e, success: true, errors: undefined }));
	};

	const handleAddExerciseClick = () => {
		onAddClick();
		setExerciseFormData((e) => ({ ...e, success: false }));
	};

	return (
		<>
			<ExeciseForm
				formData={exerciseFormData}
				onSubmit={handleExerciseSubmit}
				onDataChange={handleExerciseDataChange}
				onAdd={handleAddExerciseClick}
				onFinish={onFinishClick}
			/>
		</>
	);
}
