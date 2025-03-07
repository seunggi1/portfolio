import Link from 'next/link';

import { Button } from '@repo/ui/common';
import { Routine } from '@/types/routine';

type Props = {
	id: Routine['id'];
};

export default function RoutineUpdateButton({ id }: Props) {
	return (
		<Link href={`/routines/edit/${id}`}>
			<Button className="w-full" color={'error'}>
				루틴 수정
			</Button>
		</Link>
	);
}
