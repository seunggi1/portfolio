import { Metadata } from 'next';
import SignUp from '@/components/auth/signup/SignUp';

export const metadata: Metadata = {
	title: '회원가입',
};

export default function page() {
	return <SignUp />;
}
