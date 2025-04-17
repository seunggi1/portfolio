import { ReactElement, ReactNode, useEffect } from 'react';
import { NewExercise } from '@/types/routine';
import { Button, Input } from '@repo/ui/common';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { newExerciseSchema } from '@/schemas/routine';
import { FormGroup, RangeNumberInput } from '@/components/common/ui';
import RoutineEditFormHeading from './RoutineEditFormHeading';

type Props = {
	defaultValue: Partial<NewExercise>;
	onSubmit: (newExercise: NewExercise) => void;
	ActionsComponent: ({
		nextButton,
	}: {
		nextButton: ReactElement<HTMLButtonElement>;
	}) => ReactNode;
};

export default function ExeciseForm({
	defaultValue,
	onSubmit,
	ActionsComponent,
}: Props) {
	const {
		control,
		register,
		handleSubmit,
		formState: { errors },
		setValue,
	} = useForm<NewExercise>({
		resolver: zodResolver(newExerciseSchema),
		defaultValues: {
			...defaultValue,
		},
	});

	useEffect(() => {
		for (const key in defaultValue) {
			const propKey = key as keyof NewExercise;
			setValue(propKey, defaultValue[propKey] ?? '');
		}
	}, [defaultValue, setValue]);

	return (
		<>
			<form
				className="flex flex-col w-full gap-2"
				onSubmit={handleSubmit((d) => onSubmit(d))}
			>
				<RoutineEditFormHeading>운동 정보</RoutineEditFormHeading>
				<FormGroup
					displayName="운동 이름"
					error={errors.name?.message}
					htmlFor="name"
				>
					<Input id="name" required min={2} {...register('name')} />
				</FormGroup>
				<Controller
					control={control}
					name="secondsPerRep"
					render={({ field }) => (
						<FormGroup
							displayName="1회당 반복 시간(초)"
							htmlFor="secondsPerRep"
							error={errors.secondsPerRep?.message}
						>
							<RangeNumberInput
								id="secondsPerRep"
								min={1}
								max={10}
								step={1}
								{...field}
							/>
						</FormGroup>
					)}
				/>

				<Controller
					control={control}
					name="repetitionCount"
					render={({ field }) => (
						<FormGroup
							displayName="반복 횟수"
							htmlFor="repetitionCount"
							error={errors.repetitionCount?.message}
						>
							<RangeNumberInput
								id="repetitionCount"
								min={5}
								max={30}
								step={5}
								{...field}
							/>
						</FormGroup>
					)}
				/>

				<Controller
					control={control}
					name="nextDelaySeconds"
					render={({ field }) => (
						<FormGroup
							displayName="다음 운동 준비 시간"
							htmlFor="nextDelaySeconds"
							error={errors.nextDelaySeconds?.message}
						>
							<RangeNumberInput
								id="nextDelaySeconds"
								min={10}
								max={90}
								step={10}
								required
								{...field}
							/>
						</FormGroup>
					)}
				/>

				<ActionsComponent
					nextButton={
						<Button type="submit" className="w-full">
							저장
						</Button>
					}
				/>
			</form>
		</>
	);
}
