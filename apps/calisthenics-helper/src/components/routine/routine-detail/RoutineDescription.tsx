import { RoutineDetail } from '@/types/routine';

type Props = Pick<RoutineDetail, 'description'>;

export default function RoutineDescription({ description }: Props) {
	return (
		<div className="py-2">
			<p className="mb-2 font-bold text-md">루틴 설명</p>
			<pre className="text-md text-pretty">{description}</pre>
		</div>
	);
}
