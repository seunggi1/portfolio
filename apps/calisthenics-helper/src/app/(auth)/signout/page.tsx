import { signOut } from '@/actions/auth/authBusiness';
import { redirect } from 'next/navigation';

export default async function SignoutPage() {
	await signOut();
	redirect('/');
}
