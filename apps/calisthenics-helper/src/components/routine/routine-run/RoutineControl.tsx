import { Button } from '@repo/ui/common';
import {
	PauseIcon,
	PlayIcon,
	StopIcon,
	VolumeOffIcon,
	VolumeOnIcon,
} from '@/components/common/icon';
import { useState } from 'react';

type Props = {
	isPause: boolean;
	isMute: boolean;
	onPauseToggle: () => void;
	onMuteToggle: () => void;
	onEndClick: () => void;
};

export default function RoutineControl({
	isPause,
	isMute,
	onPauseToggle,
	onMuteToggle,
	onEndClick,
}: Props) {
	const [mute, setMute] = useState<boolean>(isMute);

	return (
		<div className="space-x-4">
			<Button onClick={onEndClick} color={'error'}>
				<StopIcon />
			</Button>
			{isPause ? (
				<Button onClick={onPauseToggle} color={'primary'}>
					<PlayIcon />
				</Button>
			) : (
				<Button onClick={onPauseToggle} color={'warning'}>
					<PauseIcon />
				</Button>
			)}
			{mute ? (
				<Button
					onClick={() => {
						onMuteToggle();
						setMute(!mute);
					}}
					color={'warning'}
				>
					<VolumeOffIcon />
				</Button>
			) : (
				<Button
					onClick={() => {
						onMuteToggle();
						setMute(!mute);
					}}
					color={'primary'}
				>
					<VolumeOnIcon />
				</Button>
			)}
		</div>
	);
}
