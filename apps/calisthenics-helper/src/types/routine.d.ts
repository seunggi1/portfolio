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
	sets: number;
	repetitionCount: number;
	totalTime: number;
	restTime: number;
};

export type RoutineDetail = Routine & { exerciseSets: ExerciseSet[] };
