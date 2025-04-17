import { signOut } from '@/business';
import { redirect } from 'next/navigation';

export default async function SignoutPage() {
	await signOut();
	redirect('/');
}
