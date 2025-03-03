import { NewRoutine } from '@/types/routine';
import { z } from 'zod';

const newRoutine: z.ZodType<NewRoutine> = z.object({
	name: z
		.string()
		.min(3, {
			message: '루틴 이름은 최소 3글자 이상 이어야 합니다.',
		})
		.max(15, {
			message: '루틴 이름은 최대 8글자까지 가능합니다.',
		}),
	difficultyLevel: z
		.number()
		.min(1, {
			message: '루틴 레벨은 1 이상 이어야 합니다.',
		})
		.max(5, {
			message: '루틴 레벨은 5를 초과할 수 없습니다.',
		}),
	restSeconds: z
		.number()
		.min(10, {
			message: '휴식 시간(초)은 최소 10초 이상 이어야 합니다.',
		})
		.max(300, {
			message: '휴식 시간(초)은 최대 5분(300초)를 초과할 수 없습니다.',
		}),
	totalSets: z.number().min(1, {
		message: '세트 수는 최소 1이상 이어야 합니다.',
	}),
	exercises: z
		.object({
			name: z.string().min(2, {
				message: '운동 이름은 최소 2글자 이상 이어야 합니다.',
			}),
			secondsPerRep: z
				.number()
				.min(1, {
					message: '1회당 반복 시간(초)는 최소 1초 이상 이어야 합니다.',
				})
				.max(10, {
					message: '1회당 반복 시간(초)는 최대 10초를 초과할 수 없습니다.',
				}),
			repetitionCount: z.number().min(1, {
				message: '운동 반복 횟수는 최소 1회 이상 이어야 합니다. ',
			}),
			nextDelaySeconds: z.number().min(5, {
				message: '다음 운동 준비 시간은 최소 5초 이상 이어야 합니다.',
			}),
			order: z.number(),
		})
		.array()
		.min(1, {
			message: '최소 1개 이상의 운동을 지정해야합니다.',
		}),
	categoryIDs: z.string().array().min(1, {
		message: '최소 1개 이상 카테고리를 선택해야 합니다.',
	}),
});

export function validateRoutineData(data: NewRoutine) {
	const result = newRoutine.safeParse(data);

	if (result.success) {
		return null;
	}

	const errors: Record<string, string> = {};
	console.log(result.error.format());
	const format = result.error.flatten();

	return Object.entries(format.fieldErrors).reduce((acc, [name, messages]) => {
		acc[name] = messages.join(' ');
		return acc;
	}, errors);
}
