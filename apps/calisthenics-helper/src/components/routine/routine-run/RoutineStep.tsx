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
		<div className="overflow-x-auto w-full mt-4 relative">
			<p className="text-center font-bold text-xl sticky left-1/2 -translate-x-1/2 mb-4">
				루틴 진행 상황
			</p>
			<ul className="steps steps-horizontal">
				{routineRunStep.stepItems.map((stepItem) => (
					<li
						key={stepItem.index + stepItem.name}
						ref={stepItem.index === routineRunStep.step ? scrollRef : null}
						className={`step text-pretty ${stepItem.index <= routineRunStep.step ? (stepItem.status === 'rest' ? 'step-success' : 'step-primary') : ''}`}
					>
						{getStepName(stepItem)}
					</li>
				))}
			</ul>
		</div>
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
		case 'delay':
			return 'step-info';
		case 'rest':
			return 'step-success';
		case 'exercise':
		default:
			return 'step-primary';
	}
}
