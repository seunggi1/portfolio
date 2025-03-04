import { DetailedHTMLProps, InputHTMLAttributes } from 'react';

type Props = {
	displayName: string;
	error?: string;
} & DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

export default function FormInput({ displayName, error, ...props }: Props) {
	return (
		<div>
			<label
				htmlFor={props.name}
				className={[
					'flex items-center gap-2 input input-bordered',
					`${error ? 'border-error' : ''}`,
				].join(' ')}
			>
				<span>{displayName}</span>
				<input
					{...props}
					id={props.id ? props.id : props.name}
					className="basis-3/4"
					key={props.key ? props.key : props.defaultValue?.toString()}
				/>
			</label>
			<span className="text-error">{error}</span>
		</div>
	);
}
