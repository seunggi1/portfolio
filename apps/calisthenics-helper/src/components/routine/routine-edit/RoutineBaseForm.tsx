import { ReactElement, ReactNode } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { RoutineCategory, RoutineFormData } from '@/types/routine';
import { routineEditSchema } from '@/schemas/routine';
import { Button, Input, TextArea } from '@repo/ui/common';
import RoutineCategorySelect from './RoutineCategorySelector';
import { FormGroup, RangeNumberInput } from '@/components/common/ui';
import RoutineLevelSelector from './RoutineLevelSelector';
import RoutineEditFormHeading from './RoutineEditFormHeading';
import RoutineImageUploader from './RoutineImageUploader';

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

				<FormGroup
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
				</FormGroup>

				<FormGroup
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
				</FormGroup>

				<Controller
					control={control}
					name="image"
					render={({ field }) => (
						<FormGroup
							displayName="루틴 이미지(선택)"
							error={errors.image?.message}
							htmlFor="image"
						>
							<RoutineImageUploader {...field} />
						</FormGroup>
					)}
				></Controller>

				<Controller
					control={control}
					name="restSeconds"
					render={({ field }) => (
						<FormGroup
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
						</FormGroup>
					)}
				/>

				<Controller
					control={control}
					name="totalSets"
					render={({ field }) => (
						<FormGroup
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
						</FormGroup>
					)}
				/>

				<Controller
					control={control}
					name="difficultyLevel"
					render={({ field }) => (
						<FormGroup
							displayName="루틴 난이도"
							error={errors.difficultyLevel?.message}
						>
							<RoutineLevelSelector {...field} />
						</FormGroup>
					)}
				/>
				<Controller
					control={control}
					name="categoryIDs"
					render={({ field }) => (
						<FormGroup
							displayName="루틴 카테고리"
							error={errors.categoryIDs?.message}
						>
							<RoutineCategorySelect
								{...field}
								routineCategories={routineCategories}
							/>
						</FormGroup>
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
