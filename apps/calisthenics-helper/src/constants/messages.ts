export const authErrorMessages = {
	SERVER_ERROR: '서버 에러가 발생했습니다. 잠시 후 시도해 주세요.',
	AUTH_ERROR: '계정 정보가 올바르지 않습니다.',
	EXISTS_DISPLAY_NAME_ERROR: '이미 존재하는 별명입니다.',
	MIN_DISPLAY_NAME_ERROR: '별명은 최소 3글자 이상 이어야 합니다.',
	MAX_DISPLAY_NAME_ERROR: '별명은 최대 8글자까지 가능합니다.',
	EXISTS_EMAIL_ERROR: '이미 존재하는 이메일입니다.',
	EMAIL_ERROR: '이메일 형식이 올바르지 않습니다.',
	MIN_PASSWORD_ERROR: '비밀번호는 최소 6자 이상 이어야 합니다.',
	MAX_PASSWORD_ERROR: '비밀번호는 최대 15자까지 가능합니다.',
	BASE_CHARACTER_PASSWORD_ERROR:
		'비밀번호는 문자, 숫자, 특수문자로 이루어져야 합니다.',
	SPECIAL_CHARACTER_PASSWORD_ERROR: '비밀번호에 특수문자가 포함되어야 합니다.',
	CURRENT_PASSWORD_ERROR: '현재 비밀번호가 올바르지 않습니다.',
	NEW_PASSWORD_ERROR: '현재 비밀번호와 새 비밀번호는 달라야 합니다.',
	NOT_MATCH_PASSWORD_ERROR: '비밀번호가 일치하지 않습니다.',
	SAME_PASSWORD_ERROR: '이전 비밀번호와 같은 비밀번호로는 변경할 수 없습니다.',
} as const;
