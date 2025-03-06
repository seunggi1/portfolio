import { useState } from 'react';
import {
	NewRoutineBase,
	RoutineBaseFormData,
	RoutineCategory,
} from '@/types/routine';
import RoutineBaseForm from './RoutineBaseForm';
import { validateRoutineBase } from '@/schemas/routine';
import { useRoutineCategories } from '@/hooks';

type Props = {
	data: Partial<NewRoutineBase>;
	onComplete: (routinBase: NewRoutineBase) => void;
};

export default function RoutineBaseEdit({ data, onComplete }: Props) {
	const [routineBaseFormData, setRoutineBaseFormData] = useState<
		Partial<RoutineBaseFormData>
	>({
		inputs: data,
	});

	const { routineCategories } = useRoutineCategories();

	const handleDataChange = (name: keyof NewRoutineBase, value: string) => {
		if (name === 'name' || name === 'description') {
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

		setRoutineBaseFormData((r) => ({ ...r, errors: undefined }));
		onComplete(routineBaseFormData.inputs as NewRoutineBase);
	};

	return (
		<RoutineBaseForm
			formData={routineBaseFormData}
			routineCategories={routineCategories}
			onRoutineCategoryClick={handleRoutineCategoryClick}
			onDataChange={handleDataChange}
			onSubmit={handleRoutineBaseSubmit}
		/>
	);
}
