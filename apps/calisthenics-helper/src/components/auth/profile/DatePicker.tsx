'use client';

import { FormEvent, MouseEvent } from 'react';
import { useRouter } from 'next/navigation';
import { FormGroup } from '@/components/common/ui';
import { Button, Input } from '@repo/ui/common';
import { myStatsSearchParam } from '@/constants/profiles';

type Props = {
	startDate: string;
	endDate: string;
};

export default function DatePicker({ startDate, endDate }: Props) {
	const router = useRouter();

	const handleDateClick = (e: MouseEvent<HTMLInputElement>) => {
		if (e.target instanceof HTMLInputElement) {
			e.target.showPicker();
		}
	};

	return (
		<form
			className="flex flex-col gap-2 p-4"
			onSubmit={(e: FormEvent<HTMLFormElement>) => {
				e.preventDefault();
				if (e.target instanceof HTMLFormElement) {
					const formData = new FormData(e.target);
					router.push(
						myStatsSearchParam.create({
							startDate: (formData.get('start-date') as string) ?? '',
							endDate: (formData.get('end-date') as string) ?? '',
						})
					);
				}
			}}
		>
			<FormGroup displayName="">
				<FormGroup displayName="시작일" htmlFor="start-date" addDivider={false}>
					<Input
						id="start-date"
						name="start-date"
						type="date"
						defaultValue={startDate}
						required
						onClick={handleDateClick}
					/>
				</FormGroup>
				<FormGroup displayName="종료일" htmlFor="end-date" addDivider={false}>
					<Input
						id="end-date"
						name="end-date"
						type="date"
						required
						defaultValue={endDate}
						onClick={handleDateClick}
					/>
					<Button color="primary" type="submit">
						검색
					</Button>
				</FormGroup>
			</FormGroup>
		</form>
	);
}
