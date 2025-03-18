import FormInput from '@/components/common/input/FormInput';
import { NewExercise } from '@/types/routine';
import { Button } from '@repo/ui/common';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { newExerciseSchema } from '@/schemas/routine';
import { RefObject, useEffect } from 'react';

type Props = {
	defaultValue: Partial<NewExercise>;
	onSubmit: (newExercise: NewExercise) => void;
	ref: RefObject<HTMLButtonElement | null>;
};

export default function ExeciseForm({ defaultValue, onSubmit, ref }: Props) {
	const {
		register,
		handleSubmit,
		formState: { errors, defaultValues },
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
			<h2 className="text-2xl font-bold">운동 정보</h2>
			<form
				className="w-3/4 space-y-8"
				onSubmit={handleSubmit((d) => onSubmit(d))}
			>
				<FormInput
					displayName="운동 이름"
					error={errors.name?.message}
					required
					{...register('name')}
				/>
				<FormInput
					displayName="1회당 반복 시간(초)"
					error={errors.secondsPerRep?.message}
					type="number"
					min={1}
					max={10}
					required
					{...register('secondsPerRep', { valueAsNumber: true })}
				/>
				<FormInput
					displayName="반복 횟수"
					error={errors.repetitionCount?.message}
					type="number"
					required
					{...register('repetitionCount', { valueAsNumber: true })}
				/>
				<FormInput
					displayName="다음 운동 준비 시간"
					error={errors.nextDelaySeconds?.message}
					type="number"
					min={5}
					required
					{...register('nextDelaySeconds', { valueAsNumber: true })}
				/>
				<Button type="submit" className="!hidden" ref={ref}>
					저장
				</Button>
			</form>
		</>
	);
}
