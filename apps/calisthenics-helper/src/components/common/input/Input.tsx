import { DetailedHTMLProps, InputHTMLAttributes } from 'react';

type Props = DetailedHTMLProps<
	InputHTMLAttributes<HTMLInputElement>,
	HTMLInputElement
>;

export default function Input({ ...props }: Props) {
	return (
		<input type="text" className="w-full input input-bordered" {...props} />
	);
}
