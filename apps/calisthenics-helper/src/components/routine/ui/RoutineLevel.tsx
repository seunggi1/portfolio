import { FlameIcon } from '@/components/common/icon';

type Props = {
	level: number;
};

export default function RoutineLevel({ level }: Props) {
	const levels = Array.from({ length: level }, (_, i) => (
		<li key={i}>
			<FlameIcon />
		</li>
	));

	return <ul className="flex -space-x-[0.4rem]">{levels}</ul>;
}
