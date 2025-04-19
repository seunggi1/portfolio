import { z } from 'zod';
import {
	exerciseErrorMessages,
	routineErrorMessages,
} from '@/constants/messages';
import { NewExercise, NewRoutine, RoutineFormData } from '@/types/routine';

export const routineEditSchema: z.ZodType<RoutineFormData> = z.object({
	name: z
		.string()
		.min(3, {
			message: routineErrorMessages.MIN_NAME_ERROR,
		})
		.max(15, {
			message: routineErrorMessages.MAX_NAME_ERROR,
		}),
	difficultyLevel: z
		.number()
		.min(1, {
			message: routineErrorMessages.MIN_DIFFICULTY_LEVEL_ERROR,
		})
		.max(5, {
			message: routineErrorMessages.MAX_DIFFICULTY_LEVEL_ERROR,
		}),
	restSeconds: z
		.number()
		.min(10, {
			message: routineErrorMessages.MIN_REST_SECONDS_ERROR,
		})
		.max(300, {
			message: routineErrorMessages.MAX_REST_SECONDS_ERROR,
		}),
	totalSets: z.number().min(1, {
		message: routineErrorMessages.MIN_TOTAL_SETS_ERROR,
	}),
	categoryIDs: z.array(z.string()).nonempty({
		message: routineErrorMessages.MIN_CATEGORY_ERROR,
	}),
	description: z
		.string()
		.min(5, { message: routineErrorMessages.MIN_DESCRIPTION_ERROR }),
	image: z.union([
		z.string(),
		z
			.instanceof(File)
			.refine(
				(file) => ['image/png', 'image/jpeg', 'image/jpg'].includes(file.type),
				{
					message: routineErrorMessages.EXTENSION_IMAGE_ERROR,
				}
			)
			.refine((file) => file.size <= 1024 * 100 * 2.5, {
				message: routineErrorMessages.MAX_SIZE_IMAGE_ERROR,
			})
			.nullable()
			.optional(),
	]),
});

export const newExerciseSchema: z.ZodType<NewExercise> = z.object({
	name: z.string().min(2, {
		message: exerciseErrorMessages.MIN_NAME_ERROR,
	}),
	secondsPerRep: z
		.number()
		.min(1, {
			message: exerciseErrorMessages.MIN_SECONDS_PER_REP_ERROR,
		})
		.max(10, {
			message: exerciseErrorMessages.MAX_SECONDS_PER_REP_ERROR,
		}),
	repetitionCount: z.number().min(1, {
		message: exerciseErrorMessages.MIN_REPETITION_COUNT_ERROR,
	}),
	nextDelaySeconds: z.number().min(5, {
		message: exerciseErrorMessages.MIN_NEXT_DELAY_SECONDS_ERROR,
	}),
	order: z.number(),
});

const exercises = z.object({
	exercises: newExerciseSchema
		.array()
		.min(1, { message: exerciseErrorMessages.MIN_EXERCISES_ERROR }),
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
