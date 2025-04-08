import UpdatePassword from '@/components/auth/update-password/UpdatePassword';
import { redirect } from 'next/navigation';

type Props = {
	searchParams: Promise<{ [key: string]: string | undefined }>;
};

export default async function page({ searchParams }: Props) {
	const token = (await searchParams)['token_hash'];
	const email = (await searchParams)['email'];

	if (token && email) {
		return <UpdatePassword token={token} email={email} />;
	}

	return redirect('/');
}
