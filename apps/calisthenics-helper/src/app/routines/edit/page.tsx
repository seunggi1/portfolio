import { Metadata } from 'next';
import RoutineEditContainer from '@/components/routine/routine-edit/RoutineEditContainer';

export const metadata: Metadata = {
	title: '루틴 생성',
};

export default function RoutineEditPage() {
	return <RoutineEditContainer />;
}
