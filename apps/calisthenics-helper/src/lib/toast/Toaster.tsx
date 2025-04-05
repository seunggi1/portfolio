'use client';

import { useToast } from './core';
import { Toast } from './types';

export function Toaster() {
	const { toasts } = useToast();

	return (
		<div className="toast toast-end text-wrap bottom-[66px] lg:bottom-0">
			{toasts.map((toast) => (
				<ToastItem key={toast.id} {...toast} />
			))}
		</div>
	);
}

function ToastItem({ type, message }: Pick<Toast, 'type' | 'message'>) {
	return (
		<div className={['w-96 text-center', getToastStyleClass(type)].join(' ')}>
			<span>{message}</span>
		</div>
	);
}

function getToastStyleClass(type: Toast['type']) {
	switch (type) {
		case 'error':
			return 'alert alert-error';
		case 'info':
		default:
			return 'alert alert-info';
	}
}
