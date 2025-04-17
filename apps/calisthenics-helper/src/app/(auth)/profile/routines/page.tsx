import { Metadata } from 'next';
import MyRoutine from '@/components/auth/profile/MyRoutine';
import { redirect } from 'next/navigation';
import { getUser } from '@/business';
import { UnauthorizedError } from '@/types/error';
import { User } from '@/types/auth';

export const metadata: Metadata = {
	title: '내 루틴',
};

export default async function MyRoutinePage() {
	let email: User['email'] | undefined;
	try {
		const user = await getUser();

		if (!user) {
			throw new UnauthorizedError('Invalid user');
		}
		email = user.email;
	} catch {
		return redirect('/signin');
	}

	if (!email) {
		return redirect('/signin');
	}

	return <MyRoutine email={email} />;
}
