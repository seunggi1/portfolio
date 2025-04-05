import { DetailedHTMLProps, TextareaHTMLAttributes } from 'react';
import { InputBase } from '../types';

type Props = InputBase &
	DetailedHTMLProps<
		TextareaHTMLAttributes<HTMLTextAreaElement>,
		HTMLTextAreaElement
	>;

export default function TextArea({
	border = true,
	className,
	...props
}: Props) {
	return (
		<textarea
			className={[
				'textarea',
				border ? 'textarea-bordered' : '',
				className,
			].join(' ')}
			{...props}
		></textarea>
	);
}
