import { ReactElement, ReactNode } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { RoutineCategory, RoutineFormData } from '@/types/routine';
import { routineEditSchema } from '@/schemas/routine';
import { Button, Input, TextArea } from '@repo/ui/common';
import RoutineCategorySelect from './RoutineCategorySelector';
import RoutineEditFormGroup from './RoutineEditFormGroup';
import RoutineLevelSelector from './RoutineLevelSelector';
import RoutineEditFormHeading from './RoutineEditFormHeading';
import RoutineImageUploader from './RoutineImageUploader';
import RangeNumberInput from '@/components/common/ui/RangeNumberInput';

type Props = {
	routineCategories: RoutineCategory[];
	defaultValue: RoutineFormData;
	onSubmit: (data: RoutineFormData) => void;
	ActionsComponent: ({
		nextButton,
	}: {
		nextButton: ReactElement<HTMLButtonElement>;
	}) => ReactNode;
};

export default function RoutineBaseForm({
	routineCategories,
	defaultValue,
	onSubmit,
	ActionsComponent,
}: Props) {
	const {
		control,
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<RoutineFormData>({
		resolver: zodResolver(routineEditSchema),
		defaultValues: {
			...defaultValue,
		},
	});

	return (
		<>
			<form
				className="flex flex-col w-full gap-2"
				onSubmit={handleSubmit((d) => onSubmit(d))}
			>
				<RoutineEditFormHeading>루틴 기본 정보</RoutineEditFormHeading>

				<RoutineEditFormGroup
					displayName="루틴 이름"
					error={errors.name?.message}
					htmlFor="name"
				>
					<Input
						type="text"
						id="name"
						min={3}
						max={15}
						required
						{...register('name')}
					/>
				</RoutineEditFormGroup>

				<RoutineEditFormGroup
					displayName="루틴 설명"
					error={errors.description?.message}
					htmlFor="description"
				>
					<TextArea
						id="description"
						min={5}
						required
						{...register('description')}
						border={true}
					/>
				</RoutineEditFormGroup>

				<Controller
					control={control}
					name="image"
					render={({ field }) => (
						<RoutineEditFormGroup
							displayName="루틴 이미지(선택)"
							error={errors.image?.message}
							htmlFor="image"
						>
							<RoutineImageUploader {...field} />
						</RoutineEditFormGroup>
					)}
				></Controller>

				<Controller
					control={control}
					name="restSeconds"
					render={({ field }) => (
						<RoutineEditFormGroup
							displayName="휴식 시간(초)"
							htmlFor="restSeconds"
							error={errors.totalSets?.message}
						>
							<RangeNumberInput
								id="restSeconds"
								min={30}
								max={180}
								step={30}
								required
								{...field}
							/>
						</RoutineEditFormGroup>
					)}
				/>

				<Controller
					control={control}
					name="totalSets"
					render={({ field }) => (
						<RoutineEditFormGroup
							displayName="세트 수"
							htmlFor="totalSets"
							error={errors.totalSets?.message}
						>
							<RangeNumberInput
								id="totalSets"
								min={1}
								max={10}
								step={1}
								required
								{...field}
							/>
						</RoutineEditFormGroup>
					)}
				/>

				<Controller
					control={control}
					name="difficultyLevel"
					render={({ field }) => (
						<RoutineEditFormGroup
							displayName="루틴 난이도"
							error={errors.difficultyLevel?.message}
						>
							<RoutineLevelSelector {...field} />
						</RoutineEditFormGroup>
					)}
				/>
				<Controller
					control={control}
					name="categoryIDs"
					render={({ field }) => (
						<RoutineEditFormGroup
							displayName="루틴 카테고리"
							error={errors.categoryIDs?.message}
						>
							<RoutineCategorySelect
								{...field}
								routineCategories={routineCategories}
							/>
						</RoutineEditFormGroup>
					)}
				/>
				<ActionsComponent
					nextButton={
						<Button className="w-full" type="submit" disabled={isSubmitting}>
							저장
						</Button>
					}
				/>
			</form>
		</>
	);
}
