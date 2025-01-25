export type Routine = {
	id: string;
	name: string;
	imageURL: string | null;
	difficultyLevel: number;
	categoryNames: string[];
	totalExerciseCount: number;
	totalMinutes: number;
};
