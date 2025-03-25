import { ChangeEvent, KeyboardEvent } from 'react';
import Input from '@/components/common/ui/Input';
import { Button } from '@repo/ui/common';

type Props = {
	onKeyUp?: (e: KeyboardEvent<HTMLInputElement>) => void;
	value?: string;
	defaultValue?: string;
	onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
	onSearchClear: () => void;
};

export default function SearchInput({
	value,
	onKeyUp,
	onChange,
	onSearchClear,
	defaultValue,
}: Props) {
	return (
		<div className="flex items-center gap-2">
			<Input
				id="search"
				placeholder="루틴 검색"
				className="border !border-secondary focus:!outline-primary !h-10"
				value={value}
				defaultValue={defaultValue}
				onChange={onChange}
				onKeyUp={onKeyUp}
			/>
			<Button color="info" size="sm" onClick={onSearchClear}>
				검색 초기화
			</Button>
		</div>
	);
}
