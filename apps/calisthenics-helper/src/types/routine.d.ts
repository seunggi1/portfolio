export type Routine = {
	id: string;
	name: string;
	imageURL: string | null;
	difficultyLevel: number;
	totalSets: number;
	restSeconds: number;
	categoryNames: string[];
	categoryIDs: string[];
	totalExerciseCount: number;
	totalMinutes: number;
	description: string;
	userID: string;
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

export type RoutinesRequest = {
	nextCursor: string | null;
	categoryID: string | null;
	searchQuery: string | null;
};

export type RoutinesByUserRequest = Pick<RoutinesRequest, 'nextCursor'>;

export type RoutinesResponse = {
	routines: Routine[];
	nextCursor: RoutinesRequest['nextCursor'];
};

export type RoutineDetail = Routine & { exercises: Exercise[] };

export type RoutineCategory = {
	id: string;
	name: string;
};

export type NewRoutineBase = Omit<
	Routine,
	| 'totalExerciseCount'
	| 'totalMinutes'
	| 'categoryNames'
	| 'imageURL'
	| 'userID'
> & {
	image?: string | File | null;
};

export type NewExercise = Omit<Exercise, 'id' | 'totalExerciseSeconds'>;

export type RoutineFormData = Omit<NewRoutine, 'id' | 'exercises'>;

export type NewRoutine = NewRoutineBase & {
	exercises: NewExercise[];
};

export type ExerciseState = {
	status: 'exercise';
	totalSeconds: number;
	name: string;
	count: number;
	currentSet: number;
	repetitionCount: number;
	secondsPerRep: number;
	setInfo: string;
};

export type DelayState = {
	status: 'delay';
	totalSeconds: number;
	nextExerciseName: string;
	setInfo: string;
};

export type RestState = {
	status: 'rest';
	totalSeconds: number;
	nextExerciseName: string;
	setInfo: string;
};

export type RoutineState = {
	isEnd: boolean;
	isPause: boolean;
	state: ExerciseState | DelayState | RestState;
};

export type StepItem = {
	index: number;
	name: string;
	status: ExerciseState['status'] | DelayState['status'] | RestState['status'];
};

export type RoutineRunStep = {
	stepItems: StepItem[];
	step: number;
};

export type RecommandRoutine = {
	routineID: Routine['id'];
	exerciseType: number;
};

export type CompletedRoutine = {
	routineID: Routine['id'];
};

export type CompletedRoutineResponse = CompletedRoutine & {
	status?: 'success' | 'error';
};

export type UserStatsRequest = {
	startDate: string;
	endDate: string;
};

export type UserStatsResult = {
	name: string;
	count: number;
};
