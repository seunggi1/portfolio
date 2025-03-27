import { createPortal } from 'react-dom';
import { PropsWithChildren, useEffect } from 'react';

type Props = {
	title: string;
	onClose: () => void;
} & PropsWithChildren;

const BASE_ID = 'modal-1';

export default function Modal({ title, children, onClose }: Props) {
	const modalID = BASE_ID + title;

	useEffect(() => {
		(document.getElementById(modalID) as HTMLDialogElement).showModal();
	}, [modalID]);

	return (
		<div>
			{createPortal(
				<dialog id={modalID} className="modal">
					<div className="modal-box">
						<h3 className="text-lg font-bold">{title}</h3>
						<div className="modal-action">{children}</div>
					</div>
					<form method="dialog" className="modal-backdrop">
						<button onClick={onClose}>close</button>
					</form>
				</dialog>,
				document.body
			)}
		</div>
	);
}
