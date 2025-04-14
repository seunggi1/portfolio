import Pre from '@/components/common/ui/Pre';
import { RoutineDetail } from '@/types/routine';

type Props = Pick<RoutineDetail, 'description'>;

export default function RoutineDescription({ description }: Props) {
	return (
		<div className="py-2">
			<p className="mb-2 font-bold text-md">루틴 설명</p>
			<Pre>{description}</Pre>
		</div>
	);
}
