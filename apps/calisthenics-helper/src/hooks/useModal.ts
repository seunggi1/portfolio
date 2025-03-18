import ModalCompoenent from '@/components/common/modal/Modal';
import { ReactNode, useState } from 'react';

type ModalProps = {
	title: string;
	children: ReactNode;
};

export default function useModal() {
	const [isShowModal, setIsShowModal] = useState<boolean>(false);

	const showModal = () => setIsShowModal(true);
	const hideModal = () => setIsShowModal(false);

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
