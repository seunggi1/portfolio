import { PropsWithChildren, RefAttributes, useEffect } from 'react';
import { createPortal } from 'react-dom';

type Props = {
	title: string;
} & PropsWithChildren;

const MODAL_ID = 'modal-1';

export default function Modal({ title, children }: Props) {
	useEffect(() => {
		(document.getElementById(MODAL_ID) as HTMLDialogElement).showModal();
	}, []);

	return (
		<div>
			{createPortal(
				<dialog id={MODAL_ID} className="modal" data-keyboard="false">
					<div className="modal-box">
						<h3 className="font-bold text-lg">{title}</h3>
						<div className="modal-action">{children}</div>
					</div>
				</dialog>,
				document.body
			)}
		</div>
	);
}
