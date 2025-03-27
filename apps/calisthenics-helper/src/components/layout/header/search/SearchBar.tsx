'use client';

import { ChangeEvent, KeyboardEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useModal } from '@/hooks';
import { SearchIcon } from '@/components/common/icon';
import SearchInput from './SearchInput';
import { Button } from '@repo/ui/common';

export default function SearchBar() {
	const [search, setSearch] = useState<string>('');
	const { Modal, showModal, hideModal } = useModal();
	const router = useRouter();

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setSearch(e.target.value);
	};

	const handleKeyUp = (e: KeyboardEvent<HTMLInputElement>) => {
		const target = e.target;
		if (target instanceof HTMLInputElement && e.key === 'Enter') {
			router.push(`/?search=${target.value}`);
			setSearch(target.value);
			hideModal();
		}
	};

	const handleSearchClear = () => {
		setSearch('');
		router.push(`/`);
		hideModal();
	};

	return (
		<div className="absolute left-1/2 -translate-x-1/2 w-[50%]">
			<div className="relative hidden w-full lg:block">
				<SearchInput
					value={search}
					onKeyUp={handleKeyUp}
					onChange={handleChange}
					onSearchClear={handleSearchClear}
				/>
			</div>
			<div className="flex justify-center lg:hidden">
				<Button
					color="ghost"
					onClick={() => showModal()}
					className="hover:text-primary lg:!hidden"
				>
					<SearchIcon />
				</Button>
			</div>
			<Modal title="루틴 검색">
				<SearchInput
					defaultValue={search}
					onKeyUp={handleKeyUp}
					onSearchClear={handleSearchClear}
				/>
			</Modal>
		</div>
	);
}
