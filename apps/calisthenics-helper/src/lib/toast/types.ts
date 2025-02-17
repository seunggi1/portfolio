export type Toast = {
	type: 'info' | 'error';
	message: string;
	id: number;
	duration: number;
};

export type ToastParam = Omit<Toast, 'duration'>;

export enum ActionType {
	ADD_TOAST = 1,
	REMOVE_TOAST = 2,
}

export type Action =
	| {
			actionType: ActionType.ADD_TOAST;
			toast: ToastParam;
	  }
	| {
			actionType: ActionType.REMOVE_TOAST;
			toastId: number;
	  };
