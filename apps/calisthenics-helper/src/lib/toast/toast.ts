import { dispatch } from './core';
import { ActionType, Toast } from './types';

let id = 1;
const generateId = () => {
	return id++;
};

const createToast = (type: Toast['type'], message: string) => {
	dispatch({
		toast: { message, type, id: generateId() },
		actionType: ActionType.ADD_TOAST,
	});
};

export const toast = (message: string) => {
	createToast('info', message);
};

toast.info = (message: string) => toast(message);
toast.error = (message: string) => createToast('error', message);
