export type Routine = {
	id: string;
	name: string;
	imageURL: string | null;
	difficultyLevel: number;
	totalSets: number;
	restSeconds: number;
	categoryNames: string[];
	totalExerciseCount: number;
	totalMinutes: number;
};

export type Exercise = {
	id: string;
	name: string;
	secondsPerRep: number;
	repetitionCount: number;
	nextDelaySeconds: number;
	totalExerciseSeconds: number;
	order: number;
};

export type RoutineDetail = Routine & { exercises: Exercise[] };

export type RoutineCategory = {
	id: string;
	name: string;
};

export type NewRoutineBase = Omit<
	Routine,
	'id' | 'totalExerciseCount' | 'totalMinutes' | 'categoryNames' | 'imageURL'
>;
export type NewExercise = Omit<Exercise, 'id' | 'totalExerciseSeconds'>;
export type CategoryID = RoutineCategory['id'];

export type NewRoutine = NewRoutineBase & {
	categoryIDs: CategoryID[];
	exercises: NewExercise[];
};

export type NewRoutineErrors = Record<
	keyof Omit<NewRoutine, 'exercises'>,
	string
> & {
	exercises: Record<keyof NewExercise, string>[];
};

export type NewRoutineFormResponse = {
	success: boolean;
	inputs?: Partial<NewRoutine>;
	errors?: Partial<NewRoutineErrors>;
};
