import { useEffect, useRef, useState } from 'react';

const MAX_ITEM = 10;

type StatusAudio = {
	rest: HTMLAudioElement;
	delay: HTMLAudioElement;
	pause: HTMLAudioElement;
	end: HTMLAudioElement;
};

function getAudio(name: string | number): HTMLAudioElement {
	return new Audio(`/sounds/${name}.mp3`);
}

export default function useRoutineSound() {
	const countAudio = useRef<HTMLAudioElement[]>([]);
	const statusAudio = useRef<StatusAudio | null>(null);

	useEffect(() => {
		const temp: HTMLAudioElement[] = new Array(MAX_ITEM);
		for (let i = 0; i < MAX_ITEM; i++) {
			temp[i] = getAudio(i);
		}

		countAudio.current = temp;

		statusAudio.current = {
			rest: getAudio('rest'),
			end: getAudio('end'),
			pause: getAudio('pause'),
			delay: getAudio('delay'),
		};

		return () => {
			countAudio.current.forEach((a) => {
				a.pause();
			});

			if (statusAudio.current) {
				Object.values(statusAudio.current).forEach((a) => {
					a.pause();
				});
			}
		};
	}, []);

	const playCount = (count: number) => {
		let targetCount = count % MAX_ITEM;
		if (countAudio.current[targetCount]) {
			countAudio.current[targetCount].play();
		}
	};

	const playStatus = (status: keyof StatusAudio) => {
		if (statusAudio.current) {
			statusAudio.current[status].play();
		}
	};

	return {
		playCount,
		playStatus,
	};
}
