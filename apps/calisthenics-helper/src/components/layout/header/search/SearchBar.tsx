'use client';

import { useModal } from '@/hooks';
import { SearchIcon } from '@/components/common/icon';
import SearchInput from './SearchInput';
import { Button } from '@repo/ui/common';

export default function SearchBar() {
	const { Modal, showModal, hideModal } = useModal();

	return (
		<div className="absolute left-1/2 -translate-x-1/2 w-[50%]">
			<div className="relative hidden w-full md:block">
				<SearchInput />
			</div>
			<div className="flex justify-center md:hidden">
				<Button
					color="ghost"
					onClick={() => showModal()}
					className="hover:text-primary md:!hidden"
				>
					<SearchIcon />
				</Button>
			</div>
			<Modal title="루틴 검색">
				<SearchInput />
			</Modal>
		</div>
	);
}
