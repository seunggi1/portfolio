import { RoutineDetail } from '@/types/routine';

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

export class RoutineController {
	private isPause = false;
	private isEnd = false;

	private routineStates: RoutineState['state'][] = [];
	private routineStateIndex = 0;

	constructor(private routineDetail: RoutineDetail) {
		const exerciseLength = routineDetail.exercises.length;
		const exercises = routineDetail.exercises;
		const firstExeciseName = exercises[0].name;

		for (let set = 1; set <= routineDetail.totalSets; set++) {
			const setInfo = `${set}/${routineDetail.totalSets}`;
			for (let i = 0; i < exerciseLength; i++) {
				const exercise = exercises[i];
				this.routineStates.push({
					...exercise,
					status: 'exercise',
					count: 0,
					currentSet: set,
					totalSeconds: exercise.secondsPerRep * exercise.repetitionCount,
					setInfo,
				});

				if (i !== exerciseLength - 1) {
					this.routineStates.push({
						status: 'delay',
						nextExerciseName: exercises[i + 1].name,
						totalSeconds: exercise.nextDelaySeconds,
						setInfo,
					});
				}
			}

			this.routineStates.push({
				status: 'rest',
				totalSeconds: routineDetail.restSeconds,
				nextExerciseName: firstExeciseName,
				setInfo,
			});
		}
	}

	changeEnd(isEnd: boolean) {
		this.isEnd = isEnd;
	}

	toggleIsPause() {
		this.isPause = !this.isPause;
	}

	createState(): RoutineState {
		return {
			isPause: this.isPause,
			isEnd: this.isEnd,
			state: { ...this.routineStates[this.routineStateIndex] },
		};
	}

	nextState(): RoutineState {
		if (this.routineStateIndex + 1 === this.routineStates.length) {
			this.changeEnd(true);
			return this.createState();
		}

		this.routineStateIndex++;

		return this.createState();
	}

	nextExerciseCount(): RoutineState {
		const currentState = this.routineStates[this.routineStateIndex];
		if (
			currentState.status === 'exercise' &&
			currentState.count < currentState.repetitionCount
		) {
			currentState.count += 1;
		}

		return this.createState();
	}
}
