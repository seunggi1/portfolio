import ModalCompoenent from '@/components/common/modal/Modal';
import { ReactNode, useCallback, useState } from 'react';

type ModalProps = {
	title: string;
	children: ReactNode;
};

export default function useModal() {
	const [isShowModal, setIsShowModal] = useState<boolean>(false);

	const showModal = useCallback(() => setIsShowModal(true), []);
	const hideModal = useCallback(() => setIsShowModal(false), []);

	const Modal = ({ children, title }: ModalProps) => {
		if (!isShowModal) {
			return null;
		}

		return ModalCompoenent({
			title,
			children,
			onClose: () => setIsShowModal(false),
		});
	};

	return {
		Modal,
		showModal,
		hideModal,
	};
}
