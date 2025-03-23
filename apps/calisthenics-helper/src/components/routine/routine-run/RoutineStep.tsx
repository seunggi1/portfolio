import { RoutineRunStep, StepItem } from '@/types/routine';
import { useEffect, useRef } from 'react';

type Props = {
	routineRunStep: RoutineRunStep;
};

export default function RoutineStep({ routineRunStep }: Props) {
	const scrollRef = useRef<HTMLLIElement>(null);

	useEffect(() => {
		scrollRef.current?.scrollIntoView({
			behavior: 'smooth',
			inline: 'center',
		});
	}, [routineRunStep]);

	return (
		<>
			<p className="block my-2 text-xl font-bold text-center">루틴 진행 상황</p>
			<div className="relative w-full overflow-x-auto text-center">
				<ul className="steps steps-horizontal">
					{routineRunStep.stepItems.map((stepItem) => (
						<li
							key={stepItem.index + stepItem.name}
							ref={stepItem.index === routineRunStep.step ? scrollRef : null}
							className={`step text-pretty ${stepItem.index <= routineRunStep.step ? getStepColorClassByStatus(stepItem.status) : ''}`}
						>
							{getStepName(stepItem)}
						</li>
					))}
				</ul>
			</div>
		</>
	);
}

function getStepName(stepItem: StepItem) {
	switch (stepItem.status) {
		case 'delay':
			return '운동준비';
		case 'rest':
			return '휴식';
		case 'exercise':
			return stepItem.name;
		default:
			return '운동';
	}
}

function getStepColorClassByStatus(status: StepItem['status']) {
	switch (status) {
		case 'rest':
			return 'step-success';
		case 'delay':
		case 'exercise':
		default:
			return 'step-primary';
	}
}
