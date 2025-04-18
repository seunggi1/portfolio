import { createAuthBusiness } from '@/business';
import { redirect } from 'next/navigation';

export default async function SignoutPage() {
	const authBusiness = await createAuthBusiness();
	await authBusiness.signOut();

	redirect('/');
}
