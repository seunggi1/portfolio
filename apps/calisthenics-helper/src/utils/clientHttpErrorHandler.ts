import { AxiosError } from 'axios';
import { ErrorName, ErrorResult } from '@/types/error';
import { clientHttpErrorMessages } from '@/constants/messages';

export function onActionError(
	error: AxiosError<ErrorResult>,
	alertCallback: (message: string) => void
) {
	let message: string = '';
	let redirectURL: string | null = null;
	switch (error.response?.data.name) {
		case ErrorName.inputValid:
			message = clientHttpErrorMessages.INPUT_ERROR;
			break;
		case ErrorName.notfound:
			message = clientHttpErrorMessages.NOT_FOUND_ERROR;
			redirectURL = '/';
			break;
		case ErrorName.unauthorized:
			message = clientHttpErrorMessages.UNAUTHORIZED_ERROR;
			redirectURL = '/signin';
			break;
		case ErrorName.serverError:
		default:
			message = clientHttpErrorMessages.SERVER_ERROR;
			break;
	}

	if (redirectURL) {
		setTimeout(() => {
			window.location.href = redirectURL;
		}, 1000);
	}

	alertCallback(message);
}
