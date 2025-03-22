import { RoutineState } from '@/types/routine';

type Props = {
	state: RoutineState['state'];
};

export default function RoutineInfo({ state }: Props) {
	return (
		<>
			<p className="text-3xl font-bold">{`${state.setInfo}`}</p>
			{state.status === 'exercise' && (
				<p className="text-xl font-bold">{state.name}</p>
			)}
			{(state.status === 'delay' || state.status === 'rest') && (
				<p className="text-xl font-bold">{`다음 운동 : ${state.nextExerciseName}`}</p>
			)}
			{state.status === 'exercise' && (
				<p className="text-xl font-bold">{state.count}회</p>
			)}
		</>
	);
}
