import { ChangeEvent } from 'react';

type Props = {
	id: string;
	className?: string;
	min: number;
	max: number;
	value: number;
	step: number;
	required?: boolean;
	onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

export default function RangeStepInput({
	id,
	min = 0,
	max,
	step,
	value,
	className,
	required,
	onChange,
}: Props) {
	const steps = Array.from({ length: max / step }, (_, i) => (
		<span className="font-bold text-md" key={i}>
			{(i + 1) * step}
		</span>
	));

	return (
		<>
			<input
				className={['range range-primary', className].join(' ')}
				id={id}
				type="range"
				min={min}
				max={max}
				value={value}
				step={step}
				required={required}
				onChange={onChange}
			/>
			<div className="flex justify-between w-full px-2 text-xs">{steps}</div>
		</>
	);
}
