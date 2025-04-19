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

export const routineErrorMessages = {
	MIN_NAME_ERROR: '루틴 이름은 최소 3글자 이상 이어야 합니다.',
	MAX_NAME_ERROR: '루틴 이름은 최대 8글자까지 가능합니다.',
	MIN_DIFFICULTY_LEVEL_ERROR: '루틴 레벨은 1 이상 이어야 합니다.',
	MAX_DIFFICULTY_LEVEL_ERROR: '루틴 레벨은 5를 초과할 수 없습니다.',
	MIN_REST_SECONDS_ERROR: '휴식 시간(초)은 최소 10초 이상 이어야 합니다.',
	MAX_REST_SECONDS_ERROR:
		'휴식 시간(초)은 최대 5분(300초)를 초과할 수 없습니다.',
	MIN_TOTAL_SETS_ERROR: '세트 수는 최소 1 이상 이어야 합니다.',
	MIN_CATEGORY_ERROR: '최소 1개 이상 카테고리를 선택해야 합니다.',
	MIN_DESCRIPTION_ERROR: '루틴 설명은 최소 5글자 이상 이어야 합니다.',
	EXTENSION_IMAGE_ERROR:
		'업로드 가능한 이미지 파일 확장자는 .jpg, .jpeg, .png 입니다.',
	MAX_SIZE_IMAGE_ERROR: '이미지 업로드 용량을 초과했습니다.',
} as const;

export const exerciseErrorMessages = {
	MIN_NAME_ERROR: '운동 이름은 최소 2글자 이상 이어야 합니다.',
	MIN_SECONDS_PER_REP_ERROR:
		'1회당 반복 시간(초)는 최소 1초 이상 이어야 합니다.',
	MAX_SECONDS_PER_REP_ERROR:
		'1회당 반복 시간(초)는 최대 10초를 초과할 수 없습니다.',
	MIN_REPETITION_COUNT_ERROR: '운동 반복 횟수는 최소 1회 이상 이어야 합니다. ',
	MIN_NEXT_DELAY_SECONDS_ERROR:
		'다음 운동 준비 시간은 최소 5초 이상 이어야 합니다.',
	MIN_EXERCISES_ERROR: '최소 1개 이상에 운동이 필요합니다.',
} as const;

export const commentErrorMessages = {
	MIN_COMMENT_ERROR: '댓글은 최소 1글자 이상 이어야 합니다',
	MIN_RECOMMENDATION_ERROR: '추천 점수는 1점 이상 이어야 합니다',
	MAX_RECOMMENDATION_ERROR: '추천 점수는 5점을 초과할 수 없습니다.',
} as const;

export const contactErrorMessages = {
	MIN_TITLE_ERROR: '제목은 최소 2글자 이상이어야 합니다.',
	MIN_CONTENTS_ERROR: '내용은 최소 5글자 이상이어야 합니다.',
} as const;
