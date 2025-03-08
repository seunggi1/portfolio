import { createPortal } from 'react-dom';
import { PropsWithChildren, useEffect } from 'react';

type Props = {
	title: string;
	onClose: () => void;
} & PropsWithChildren;

const MODAL_ID = 'modal-1';

export default function Modal({ title, children, onClose }: Props) {
	useEffect(() => {
		(document.getElementById(MODAL_ID) as HTMLDialogElement).showModal();
	}, []);

	return (
		<div>
			{createPortal(
				<dialog id={MODAL_ID} className="modal">
					<div className="modal-box">
						<h3 className="font-bold text-lg">{title}</h3>
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
