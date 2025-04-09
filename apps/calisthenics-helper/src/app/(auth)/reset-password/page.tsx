import { Metadata } from 'next';
import ResetPassword from '@/components/auth/reset-password/ResetPassword';

export const metadata: Metadata = {
	title: '비밀번호 초기화',
};

export default function ResetPage() {
	return <ResetPassword />;
}
