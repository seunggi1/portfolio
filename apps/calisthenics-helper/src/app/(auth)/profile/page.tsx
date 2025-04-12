import { Metadata } from 'next';
import Profile from '@/components/auth/profile/Profile';

export const metadata: Metadata = {
	title: '내 정보',
};

export default function ProfilePage() {
	return <Profile />;
}
