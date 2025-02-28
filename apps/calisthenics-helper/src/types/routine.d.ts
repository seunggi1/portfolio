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
