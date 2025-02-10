export type Routine = {
	id: string;
	name: string;
	imageURL: string | null;
	difficultyLevel: number;
	categoryNames: string[];
	totalExerciseCount: number;
	totalMinutes: number;
};

export type ExerciseSet = {
	id: string;
	name: string;
	exerciseName: string;
	sets: number;
	repetitionCount: number;
	exerciseSeconds: number;
	restSeconds: number;
	order: number;
};

export type RoutineDetail = Routine & { exerciseSets: ExerciseSet[] };
