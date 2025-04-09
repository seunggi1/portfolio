import Link from 'next/link';
import { Button } from '@repo/ui/common';

export default function RoutineEnd() {
	return (
		<div className="p-2 text-center rounded-md">
			<p className="mb-4 font-bold">루틴이 종료 되었습니다</p>
			<Link href={'/'}>
				<Button>메인 페이지로</Button>
			</Link>
		</div>
	);
}
