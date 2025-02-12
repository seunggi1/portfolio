import FlameIcon from '@/components/common/icon/FlameIcon';

type Props = {
	level: number;
};

export default function RoutineLevel({ level }: Props) {
	const levels = Array.from({ length: level }, (_, i) => {
		return (
			<li key={i}>
				<FlameIcon />
			</li>
		);
	});

	return <ul className="flex -space-x-[0.4rem]">{levels}</ul>;
}
