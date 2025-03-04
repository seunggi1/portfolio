'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import {
	ExerciseFormData,
	NewExercise,
	NewRoutineBase,
	RoutineBaseFormData,
	RoutineCategory,
} from '@/types/routine';
import RoutineBaseForm from './RoutineBaseForm';
import { validateExercise, validateRoutineBase } from '@/schemas/routine';
import { useRoutineCategories } from '@/hooks';
import ExeciseForm from './ExerciseForm';

type Step = 'RoutineBase' | 'Exercise' | 'finish';

export default function RoutineEdit() {
	const [routineBaseFormData, setRoutineBaseFormData] = useState<
		Partial<RoutineBaseFormData>
	>({
		inputs: { categoryIDs: [] },
	});

	const { routineCategories } = useRoutineCategories();
	const [exerciseFormData, setExerciseFormData] = useState<
		Partial<ExerciseFormData>
	>({});
	const [execises, setExercises] = useState<NewExercise[]>([]);
	const [step, setStep] = useState<Step>('RoutineBase');
	const params = useSearchParams();
	const searchParam = params.toString();

	useEffect(() => {
		window.history.replaceState(null, '', `?progress=routine`);
	}, []);

	useEffect(() => {
		const progress = params.get('progress');
		console.log(progress);
		if (!progress || progress === 'routine') {
			setStep('RoutineBase');
		} else {
			setStep('Exercise');
		}
	}, [searchParam]);

	const handleDataChange = (name: keyof NewRoutineBase, value: string) => {
		if (name === 'name') {
			setRoutineBaseFormData((r) => ({
				...r,
				inputs: { ...r.inputs, [name]: value },
			}));
		} else {
			setRoutineBaseFormData((r) => ({
				...r,
				inputs: { ...r.inputs, [name]: !value ? undefined : +value },
			}));
		}
	};

	const handleRoutineCategoryClick = (id: RoutineCategory['id']) => {
		const prevCatgoriesSet = new Set(routineBaseFormData.inputs?.categoryIDs);
		let categories = [];

		if (prevCatgoriesSet.has(id)) {
			categories = Array.from(prevCatgoriesSet).filter(
				(categoryID) => categoryID !== id
			);
		} else {
			prevCatgoriesSet.add(id);
			categories = Array.from(prevCatgoriesSet);
		}

		setRoutineBaseFormData((r) => ({
			...r,
			inputs: {
				...r.inputs,
				categoryIDs: categories,
			},
		}));
	};

	const handleRoutineBaseSubmit = () => {
		const errors = validateRoutineBase(routineBaseFormData.inputs);

		if (errors) {
			return setRoutineBaseFormData((r) => ({ ...r, errors }));
		}

		const urlSearchParams = new URLSearchParams(params.toString());
		urlSearchParams.set('progress', 'exercise');
		urlSearchParams.set('order', '0');
		window.history.pushState(null, '', `?${urlSearchParams.toString()}`);
		setStep('Exercise');
		setRoutineBaseFormData((r) => ({ ...r, errors: undefined }));
	};

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
		exercise.order = +(params.get('order') || 0);
		setExercises((e) => [...e, { ...exercise }]);
		setExerciseFormData((e) => ({ ...e, errors: undefined }));

		setStep('finish');
	};

	return (
		<>
			{step === 'RoutineBase' && (
				<RoutineBaseForm
					formData={routineBaseFormData}
					routineCategories={routineCategories}
					onRoutineCategoryClick={handleRoutineCategoryClick}
					onDataChange={handleDataChange}
					onSubmit={handleRoutineBaseSubmit}
				/>
			)}
			{step === 'Exercise' && (
				<ExeciseForm
					onSubmit={handleExerciseSubmit}
					onDataChange={handleExerciseDataChange}
					formData={exerciseFormData}
				/>
			)}
		</>
	);
}
