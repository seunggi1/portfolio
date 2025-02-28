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
	const [isMute, setIsMute] = useState<boolean>(false);

	useEffect(() => {
		const temp: HTMLAudioElement[] = new Array(MAX_ITEM);
		for (let i = 0; i < MAX_ITEM; i++) {
			temp[i] = getAudio(i);
			temp[i].load();
		}

		countAudio.current = temp;

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

			if (statusAudio.current) {
				Object.values(statusAudio.current).forEach((a) => {
					a.pause();
				});
			}
		};
	}, []);

	useEffect(() => {
		countAudio.current.forEach((a) => {
			a.muted = isMute;
		});

		if (statusAudio.current) {
			Object.values(statusAudio.current).forEach((a) => {
				a.muted = isMute;
			});
		}
	}, [isMute]);

	const playCount = (count: number) => {
		let targetCount = count % MAX_ITEM;
		if (countAudio.current[targetCount]) {
			countAudio.current[targetCount].play().catch((error) => {
				countAudio.current[targetCount]?.pause();
			});
		}
	};

	const playStatus = async (status: keyof StatusAudio) => {
		if (statusAudio.current) {
			statusAudio.current[status].play().catch((error) => {
				if (statusAudio.current) {
					statusAudio.current[status].pause();
				}
			});
		}
	};

	return {
		playCount,
		playStatus,
		isMute,
		handleMuteToggle: () => {
			setIsMute((m) => !m);
		},
	};
}
