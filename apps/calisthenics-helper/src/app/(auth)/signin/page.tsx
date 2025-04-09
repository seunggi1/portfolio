import { Metadata } from 'next';
import SignIn from '@/components/auth/signin/SignIn';

export const metadata: Metadata = {
	title: '로그인',
};

export default function page() {
	return <SignIn />;
}
