import { NewExercise, NewRoutine, RoutineFormData } from '@/types/routine';
import { z } from 'zod';

export const routineEditSchema: z.ZodType<RoutineFormData> = z.object({
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
	categoryIDs: z.array(z.string()).nonempty({
		message: '최소 1개 이상 카테고리를 선택해야 합니다.',
	}),
	description: z
		.string()
		.min(5, { message: '설명은 최소 5글자 이상 이어야 합니다.' }),
});

export const newExerciseSchema: z.ZodType<NewExercise> = z.object({
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
});

const exercises = z.object({
	exercises: newExerciseSchema
		.array()
		.min(1, { message: '최소 1개 이상에 운동이 필요합니다.' }),
});

const fullRoutineData = z.intersection(routineEditSchema, exercises);

export function validateFullRoutineData(
	data: NewRoutine
): Record<string, string> | null {
	const result = fullRoutineData.safeParse(data);

	if (result.success) {
		return null;
	}

	const format = result.error.flatten();

	const errors = Object.fromEntries(
		Object.entries(format.fieldErrors).map(([name, value]) => [
			name,
			value.join(','),
		])
	);

	return errors;
}
