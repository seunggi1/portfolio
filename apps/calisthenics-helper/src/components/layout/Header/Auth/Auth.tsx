'use server';

import { getUser } from '@/actions/auth/authBusiness';
import ProfileButton from './ProfileButton';
import AuthButton from './AuthButton';

export default async function Auth() {
	const user = await getUser();

	return user ? (
		<div className="flex gap-2 items-center">
			<ProfileButton href="profile" />
			<AuthButton href="signout">로그아웃</AuthButton>
		</div>
	) : (
		<AuthButton href="signin">로그인</AuthButton>
	);
}
