import { ChangeEvent, useState } from 'react';
import RangeStepInput from './RangeStepInput';
import Input from './Input';
import { Button } from '@repo/ui/common';

type Props = {
	id: string;
	value: number;
	min: number;
	max: number;
	step: number;
	required?: boolean;
	onChange: (value: number) => void;
};

export default function RangeNumberInput({
	id,
	value,
	min,
	max,
	step,
	onChange,
	required,
}: Props) {
	const [isRangeInput, setIsRangeInput] = useState<boolean>(true);

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		onChange(Math.max(min, +e.target.value));
	};

	return (
		<div>
			{isRangeInput ? (
				<RangeStepInput
					id={id}
					min={min}
					max={max}
					step={step}
					value={value}
					onChange={handleChange}
					required={required}
				/>
			) : (
				<Input
					id={id}
					type="number"
					min={min}
					value={value}
					required={required}
					onChange={handleChange}
				/>
			)}
			<Button
				className="mt-2"
				color="primary"
				size="sm"
				onClick={() => setIsRangeInput(!isRangeInput)}
			>
				{isRangeInput ? '직접 입력' : '범위 입력'}
			</Button>
		</div>
	);
}
