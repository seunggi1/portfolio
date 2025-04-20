'use client';

import { SearchIcon } from '@/components/common/icon';
import SearchInput from './SearchInput';
import { Button } from '@repo/ui/common';
import useRoutineSearch from '@/hooks/useRoutineSearch';

export default function SearchBar() {
	const {
		search,
		handleChange,
		Modal,
		handleKeyUp,
		handleSearchClear,
		showModal,
	} = useRoutineSearch();

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
					onClick={showModal}
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
