import Routines from '@/components/routine/routine-home/Routines';
import { Suspense } from 'react';

export default function HomePage() {
	return (
		<Suspense fallback={'데이터를 불러오는 중입니다..'}>
			<Routines />
		</Suspense>
	);
}
