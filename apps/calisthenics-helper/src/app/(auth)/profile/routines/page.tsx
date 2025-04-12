import { Metadata } from 'next';
import MyRoutine from '@/components/auth/profile/MyRoutine';

export const metadata: Metadata = {
	title: '내 루틴',
};

export default function MyRoutinePage() {
	return <MyRoutine />;
}
