import { Input } from '@repo/ui/common';
import { DetailedHTMLProps, InputHTMLAttributes, MouseEvent } from 'react';

type Props = DetailedHTMLProps<
	InputHTMLAttributes<HTMLInputElement>,
	HTMLInputElement
>;

export default function DateInput({ ...props }: Props) {
	const handleDateClick = (e: MouseEvent<HTMLInputElement>) => {
		if (e.target instanceof HTMLInputElement) {
			e.target.showPicker();
		}
	};

	return <Input type="date" {...props} onClick={handleDateClick} />;
}
