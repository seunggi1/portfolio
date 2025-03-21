import { RoutineDetail, RoutineRunStep, RoutineState } from '@/types/routine';

export class RoutineController {
	private isEnd = false;

	private routineStates: RoutineState['state'][] = [];
	private routineStateIndex = 0;

	constructor(
		private routineDetail: RoutineDetail,
		private isPause = true
	) {
		const exerciseLength = routineDetail.exercises.length;
		const exercises = routineDetail.exercises;
		const firstExeciseName = exercises[0].name;

		this.routineStates.push({
			status: 'delay',
			nextExerciseName: routineDetail.exercises[0].name,
			totalSeconds: 10,
			setInfo: '운동 시작 대기',
		});

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

			if (set !== routineDetail.totalSets) {
				this.routineStates.push({
					status: 'rest',
					totalSeconds: routineDetail.restSeconds,
					nextExerciseName: firstExeciseName,
					setInfo,
				});
			}
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

	getRoutineRunStep(): RoutineRunStep {
		console.log('call Run step');
		return {
			step: this.routineStateIndex,
			stepItems: this.routineStates.map((s, i) => ({
				index: i,
				name: s.status === 'exercise' ? s.name : s.status,
				status: s.status,
			})),
		};
	}
}
