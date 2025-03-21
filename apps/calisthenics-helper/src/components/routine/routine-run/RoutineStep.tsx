import { RoutineRunStep, StepItem } from '@/types/routine';

type Props = {
	routineRunStep: RoutineRunStep;
};

export default function RoutineStep({ routineRunStep }: Props) {
	return (
		<ul className="steps steps-vertical lg:steps-horizontal">
			{routineRunStep.stepItems.map((stepItem) => (
				<li
					key={stepItem.index + stepItem.name}
					className={`step ${stepItem.index <= routineRunStep.step ? 'step-primary' : ''}`}
				>
					{getStepName(stepItem)}
				</li>
			))}
		</ul>
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
