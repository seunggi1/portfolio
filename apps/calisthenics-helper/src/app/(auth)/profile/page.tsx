import { Metadata } from 'next';
import ProfileContainer from '@/components/auth/profile/ProfileContainer';

export const metadata: Metadata = {
	title: '내 정보',
};

export default function ProfilePage() {
	return <ProfileContainer />;
}
