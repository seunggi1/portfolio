import useTimer from '@/hooks';

type Props = {
	prepareSeconds: number;
	onPrepare: () => void;
};

export default function RoutinePrepare({ prepareSeconds, onPrepare }: Props) {
	const { latestSeconds } = useTimer({
		seconds: prepareSeconds,
		onExpire: onPrepare,
	});

	return (
		<div className="flex flex-col items-center justify-center w-full h-full gap-4 text-8xl font-bold bg-secondary">
			{Math.ceil(latestSeconds)}
		</div>
	);
}
