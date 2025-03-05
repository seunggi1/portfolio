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
> & {
	categoryIDs: CategoryID[];
};

export type NewExercise = Omit<Exercise, 'id' | 'totalExerciseSeconds'>;

export type RoutineBaseErrors = Record<
	keyof Omit<NewRoutineBase, 'exercises'>,
	string
>;

export type ExerciseErrors = Record<keyof NewExercise, string>;

export type RoutineBaseFormData = {
	success?: boolean;
	inputs?: Partial<NewRoutineBase>;
	errors?: Partial<RoutineBaseErrors>;
};

export type ExerciseFormData = {
	success?: boolean;
	inputs?: Partial<NewExercise>;
	errors?: Partial<ExerciseErrors>;
};
