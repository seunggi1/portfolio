import { Action, ActionType, Toast } from './types';
import { useEffect, useState } from 'react';

const defaultDuration = {
	info: 2000,
	error: 3000,
};

const reducer = (state: Toast[], action: Action): Toast[] => {
	switch (action.actionType) {
		case ActionType.ADD_TOAST:
			return [
				...state,
				{
					...action.toast,
					duration: Date.now() + defaultDuration[action.toast.type],
				},
			];
		case ActionType.REMOVE_TOAST:
			return state.filter((toast) => toast.id !== action.toastId);
	}

	return state;
};

let listeners: Array<(toast: Toast[]) => void> = [];
export let memoryState: Toast[] = [];
export const dispatch = (action: Action) => {
	memoryState = reducer(memoryState, action);
	listeners.forEach((listener) => listener(memoryState));
};

export function useToast() {
	const [toasts, setToasts] = useState<Toast[]>(memoryState);

	useEffect(() => {
		listeners.push(setToasts);

		() => {
			const index = listeners.findIndex((v) => v === setToasts);
			if (index > -1) {
				listeners.splice(index, 1);
			}
		};
	}, []);

	useEffect(() => {
		const timeouts = toasts.map((toast) => {
			return setInterval(() => {
				const now = Date.now();

				if (now > toast.duration) {
					dispatch({ actionType: ActionType.REMOVE_TOAST, toastId: toast.id });
				}
			}, 100);
		});
		return () => {
			timeouts.forEach((timeout) => {
				clearInterval(timeout);
			});
		};
	}, [toasts]);

	return {
		toasts,
	};
}
