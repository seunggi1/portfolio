import FormInput from '@/components/common/input/FormInput';
import { NewExercise } from '@/types/routine';
import { Button } from '@repo/ui/common';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { newExerciseSchema } from '@/schemas/routine';

type Props = {
	defaultValue: Partial<NewExercise>;
	onSubmit: (newExercise: NewExercise) => void;
};

export default function ExeciseForm({ defaultValue, onSubmit }: Props) {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<NewExercise>({
		resolver: zodResolver(newExerciseSchema),
		defaultValues: {
			...defaultValue,
		},
	});

	return (
		<section className="flex flex-col items-center justify-center w-full h-full gap-4">
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
				<div className="flex flex-col gap-4 text-right">
					<Button type="submit">저장</Button>
				</div>
			</form>
		</section>
	);
}
