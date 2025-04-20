import { useEffect, useRef } from 'react';

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
	const beepAudio = useRef<HTMLAudioElement>(null);
	const isMute = useRef<boolean>(false);

	useEffect(() => {
		const temp: HTMLAudioElement[] = new Array(MAX_ITEM);
		for (let i = 0; i < MAX_ITEM; i++) {
			temp[i] = getAudio(i);
			temp[i].load();
		}

		countAudio.current = temp;

		beepAudio.current = getAudio('beep-sound');

		statusAudio.current = {
			rest: getAudio('rest'),
			end: getAudio('end'),
			pause: getAudio('pause'),
			delay: getAudio('delay'),
		};

		Object.values(statusAudio.current).forEach((a) => {
			a.load();
		});

		return () => {
			countAudio.current.forEach((a) => {
				a.pause();
			});

			beepAudio.current?.pause();

			if (statusAudio.current) {
				Object.values(statusAudio.current).forEach((a) => {
					a.pause();
				});
			}
		};
	}, []);

	const playCount = (count: number) => {
		if (isMute.current) {
			return;
		}

		const targetCount = count % MAX_ITEM;
		if (countAudio.current[targetCount]) {
			countAudio.current[targetCount].play().catch(() => {
				countAudio.current[targetCount]?.pause();
			});
		}
	};

	const playStatus = (status: keyof StatusAudio) => {
		if (isMute.current) {
			return;
		}

		if (statusAudio.current) {
			statusAudio.current[status].play().catch(() => {
				if (statusAudio.current) {
					statusAudio.current[status].pause();
				}
			});
		}
	};

	const playBeep = () => {
		if (isMute.current) {
			return;
		}

		if (beepAudio.current) {
			beepAudio.current.play().catch(() => {
				beepAudio.current?.pause();
			});
		}
	};

	const handleMuteToggle = () => {
		isMute.current = !isMute.current;
	};

	return {
		playCount,
		playStatus,
		playBeep,
		isMute: isMute.current,
		handleMuteToggle,
	};
}
