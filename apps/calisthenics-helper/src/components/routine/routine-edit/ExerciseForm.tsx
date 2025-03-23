import { ReactElement, ReactNode, useEffect } from 'react';
import { NewExercise } from '@/types/routine';
import { Button } from '@repo/ui/common';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { newExerciseSchema } from '@/schemas/routine';
import RoutineEditFormGroup from './RoutineEditFormGroup';
import Input from '@/components/common/ui/Input';
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
				<RoutineEditFormGroup
					displayName="운동 이름"
					error={errors.name?.message}
					htmlFor="name"
				>
					<Input id="name" required min={2} {...register('name')} />
				</RoutineEditFormGroup>
				<RoutineEditFormGroup
					displayName="1회당 반복 시간(초)"
					error={errors.secondsPerRep?.message}
					htmlFor="secondsPerRep"
				>
					<Input
						id="secondsPerRep"
						type="number"
						min={1}
						max={10}
						required
						{...register('secondsPerRep', { valueAsNumber: true })}
					/>
				</RoutineEditFormGroup>
				<RoutineEditFormGroup
					displayName="반복 횟수"
					error={errors.repetitionCount?.message}
					htmlFor="repetitionCount"
				>
					<Input
						id="repetitionCount"
						type="number"
						required
						min={1}
						{...register('repetitionCount', { valueAsNumber: true })}
					/>
				</RoutineEditFormGroup>
				<RoutineEditFormGroup
					displayName="다음 운동 준비 시간"
					error={errors.nextDelaySeconds?.message}
					htmlFor="nextDelaySeconds"
				>
					<Input
						id="nextDelaySeconds"
						type="number"
						min={5}
						required
						{...register('nextDelaySeconds', { valueAsNumber: true })}
					/>
				</RoutineEditFormGroup>
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
