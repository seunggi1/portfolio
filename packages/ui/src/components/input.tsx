import { DetailedHTMLProps, InputHTMLAttributes } from 'react';
import { InputBase } from '../types';

type Props = InputBase &
	DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

export default function Input({ border = true, className, ...props }: Props) {
	return (
		<input
			type="text"
			className={[
				'w-full input',
				border ? 'input-bordered' : '',
				className,
			].join(' ')}
			{...props}
		/>
	);
}
