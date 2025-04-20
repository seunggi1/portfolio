'use client';

import { ChangeEvent, KeyboardEvent, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { routineSearchParam } from '@/constants/routines';
import { useDebounce, useModal } from './';

export default function useRoutineSearch() {
	const [search, setSearch] = useState<string>('');
	const { handleDebounce } = useDebounce({ delaySeconds: 0.5 });
	const { Modal, showModal, hideModal } = useModal();

	const router = useRouter();
	const params = useSearchParams();

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setSearch(e.target.value);

		handleDebounce(() => {
			window.history.replaceState(
				null,
				'',
				routineSearchParam.createRoutineSearchParam({
					categoryID: params.get(routineSearchParam.categoryID),
					searchQuery: e.target.value,
				})
			);
		});
	};

	const handleKeyUp = (e: KeyboardEvent<HTMLInputElement>) => {
		const target = e.target;
		if (target instanceof HTMLInputElement) {
			if (e.key === 'Enter') {
				router.push(
					`/${routineSearchParam.createRoutineSearchParam({
						categoryID: params.get(routineSearchParam.categoryID),
						searchQuery: target.value,
					})}`
				);
				setSearch(target.value);
				hideModal();
			}
		}
	};

	const handleSearchClear = () => {
		setSearch('');
		router.push(`/`);
		hideModal();
	};

	return {
		search,
		handleChange,
		handleSearchClear,
		handleKeyUp,
		Modal,
		showModal,
	};
}
