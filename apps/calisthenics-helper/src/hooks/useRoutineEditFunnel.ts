import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

type Step = 'routine' | 'exercise' | 'finish';

type RoutineProgress = {
	type: 'routine';
};

type ExerciseProgress = {
	type: 'exercise';
	order: number;
};

type FinishProgress = {
	type: 'finish';
};

type Progress = RoutineProgress | ExerciseProgress | FinishProgress;

export default function useRoutineEditFunnel() {
	const [step, setStep] = useState<Step>('routine');
	const params = useSearchParams();
	const exerciseOrder = +(params.get('order') || 0);

	useEffect(() => {
		const progress = params.get('progress');
		if (progress) {
			setStep(progress as Step);
		} else {
			setStep('routine');
		}
	}, [params]);

	const changeStep = (progress: Progress) => {
		const urlSearchParams = new URLSearchParams();
		urlSearchParams.set('progress', progress.type);

		if (progress.type === 'exercise') {
			urlSearchParams.set('order', progress.order.toString());
		}

		window.history.pushState(null, '', `?${urlSearchParams}`);
		setStep(progress.type);
	};

	const backStep = () => {
		window.history.back();
	};

	return {
		step,
		exerciseOrder,
		changeStep,
		backStep,
	};
}
