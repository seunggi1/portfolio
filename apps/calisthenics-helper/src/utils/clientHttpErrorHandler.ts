import { AxiosError } from 'axios';
import { ErrorName, ErrorResult } from '@/types/error';

export function onActionError(
	error: AxiosError<ErrorResult>,
	alertCallback: (message: string) => void
) {
	let message: string = '';
	let redirectURL: string | null = null;
	switch (error.response?.data.name) {
		case ErrorName.inputValid:
			message = '입력값이 올바르지 않습니다.';
			break;
		case ErrorName.notfound:
			message = '존재하지않는 데이터 입니다. 메인 화면으로 이동합니다.';
			redirectURL = '/';
			break;
		case ErrorName.unauthorized:
			message =
				'유저 인증정보가 올바르지 않습니다. 로그인 페이지로 이동합니다.';
			redirectURL = '/signin';
			break;
		case ErrorName.serverError:
		default:
			message = '서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.';
			break;
	}

	if (redirectURL) {
		setTimeout(() => {
			window.location.href = redirectURL;
		}, 1000);
	}

	alertCallback(message);
}
