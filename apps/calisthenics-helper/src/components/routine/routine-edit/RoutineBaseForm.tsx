import { Ref, RefObject } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import FormInput from '@/components/common/input/FormInput';
import { RoutineCategory, RoutineFormData } from '@/types/routine';
import { routineEditSchema } from '@/schemas/routine';
import RoutineCategorySelect from './RoutineCategorySelector';
import { Button } from '@repo/ui/common';

type Props = {
	routineCategories: RoutineCategory[];
	defaultValue: RoutineFormData;
	onSubmit: (data: RoutineFormData) => void;
	ref: RefObject<HTMLButtonElement | null>;
};

export default function RoutineBaseForm({
	routineCategories,
	defaultValue,
	onSubmit,
	ref,
}: Props) {
	const {
		control,
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<RoutineFormData>({
		resolver: zodResolver(routineEditSchema),
		defaultValues: {
			...defaultValue,
		},
	});

	return (
		<>
			<h2 className="text-2xl font-bold">루틴 기본 정보</h2>
			<form
				className="w-3/4 space-y-8"
				onSubmit={handleSubmit((d) => onSubmit(d))}
			>
				<FormInput
					displayName="루틴 이름"
					type="text"
					min={3}
					max={15}
					error={errors.name?.message}
					required
					{...register('name')}
				/>
				<FormInput
					displayName="루틴 설명"
					type="text"
					min={5}
					error={errors.description?.message}
					required
					{...register('description')}
				/>
				<FormInput
					displayName="루틴 난이도"
					type="number"
					min={1}
					max={5}
					error={errors.difficultyLevel?.message}
					required
					{...register('difficultyLevel', { valueAsNumber: true })}
				/>
				<FormInput
					displayName="휴식 시간(초)"
					type="number"
					error={errors.restSeconds?.message}
					required
					{...register('restSeconds', { valueAsNumber: true })}
				/>
				<FormInput
					displayName="세트 수"
					type="number"
					min={1}
					error={errors.totalSets?.message}
					required
					{...register('totalSets', { valueAsNumber: true })}
				/>
				<Controller
					control={control}
					name="categoryIDs"
					render={({ field }) => (
						<RoutineCategorySelect
							{...field}
							routineCategories={routineCategories}
							error={errors.categoryIDs?.message}
						/>
					)}
				/>

				<Button className="!hidden w-full" type="submit" ref={ref}>
					저장
				</Button>
			</form>
		</>
	);
}
