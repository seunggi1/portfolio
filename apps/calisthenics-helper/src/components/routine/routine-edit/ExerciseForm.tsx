import { ChangeEvent, FormEvent } from 'react';
import FormInput from '@/components/common/input/FormInput';
import { ExerciseFormData, NewExercise } from '@/types/routine';
import { nameofFactory } from '@/utils/type';
import { Button } from '@repo/ui/common';

type Props = {
	formData: ExerciseFormData;
	onDataChange: (name: keyof NewExercise, value: string) => void;
	onSubmit: () => void;
	onAdd: () => void;
	onFinish: () => void;
};

export default function ExeciseForm({
	formData: { success, inputs: data, errors },
	onDataChange,
	onSubmit,
	onAdd,
	onFinish,
}: Props) {
	const exerciseNameof = nameofFactory<NewExercise>();

	const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		const inputElem = e.target;

		const name = inputElem.name as keyof NewExercise;
		onDataChange(name, inputElem.value);
	};

	return (
		<section className="flex flex-col items-center justify-center w-full h-full gap-4">
			<h2 className="text-2xl font-bold">운동 정보</h2>
			<form
				className="w-3/4 space-y-8"
				onSubmit={(e: FormEvent<HTMLFormElement>) => {
					e.preventDefault();
					onSubmit();
				}}
			>
				<FormInput
					name={`${exerciseNameof('name')}`}
					displayName="운동 이름"
					value={data?.name ?? ''}
					error={errors?.name}
					onChange={onInputChange}
					required
				/>
				<FormInput
					name={`${exerciseNameof('secondsPerRep')}`}
					displayName="1회당 반복 시간(초)"
					value={data?.secondsPerRep ?? ''}
					error={errors?.secondsPerRep}
					onChange={onInputChange}
					type="number"
					min={1}
					max={10}
					required
				/>
				<FormInput
					name={`${exerciseNameof('repetitionCount')}`}
					displayName="반복 횟수"
					value={data?.repetitionCount ?? ''}
					error={errors?.repetitionCount}
					onChange={onInputChange}
					type="number"
					required
				/>
				<FormInput
					name={`${exerciseNameof('nextDelaySeconds')}`}
					displayName="다음 운동 준비 시간"
					value={data?.nextDelaySeconds ?? ''}
					error={errors?.nextDelaySeconds}
					onChange={onInputChange}
					type="number"
					min={5}
					required
				/>
				<div className="flex flex-col gap-4 text-right">
					{!success && (
						<Button type="submit" className="hidden">
							저장
						</Button>
					)}
					{success && (
						<>
							<Button
								disabled={!success}
								type="button"
								color={'secondary'}
								onClick={onAdd}
							>
								다음 운동 추가/수정
							</Button>
							<Button type="button" disabled={!success} onClick={onFinish}>
								다음 페이지로
							</Button>
						</>
					)}
				</div>
			</form>
		</section>
	);
}
