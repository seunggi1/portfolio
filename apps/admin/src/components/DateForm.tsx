import { FormEvent, useState, useTransition } from 'react';
import { StatsRequest } from '@/types/stats';
import { Button, Loading } from '@repo/ui/common';
import Container from './Container';
import DateInput from './DateInput';
import { DEFAULT_DATE } from '@/constant/stats';

type Props = {
	onSubmit: (data: StatsRequest) => void;
};

export default function DatePickerForm({ onSubmit }: Props) {
	const [isPending, startTransition] = useTransition();
	const [error, setError] = useState<string>();

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		startTransition(async () => {
			e.preventDefault();

			const formData = new FormData(e.target as HTMLFormElement);
			const date = {
				startDate: formData.get('start-date') as string,
				endDate: formData.get('end-date') as string,
			};

			if (date.startDate <= date.endDate) {
				onSubmit(date);
				setError('');
			} else {
				setError('검색 일자가 올바르지 않습니다.');
			}
		});
	};

	return (
		<Container className="p-2 mt-8">
			<h1 className="p-2 text-2xl font-bold text-center">
				맨몸운동헬퍼 대시보드
			</h1>
			<form className="flex flex-col gap-2" onSubmit={handleSubmit}>
				<label htmlFor="start-date">시작일</label>
				<DateInput
					type="date"
					name="start-date"
					required
					defaultValue={DEFAULT_DATE.start}
				/>
				<label htmlFor="end-date">종료일</label>
				<DateInput
					type="date"
					name="end-date"
					required
					defaultValue={DEFAULT_DATE.end}
				/>
				{error && <span className="text-error">{error}</span>}
				<Button disabled={isPending} type="submit">
					{isPending ? <Loading /> : '검색'}
				</Button>
			</form>
		</Container>
	);
}
