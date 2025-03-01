'use client';

import ProfileButton from './ProfileButton';
import AuthButton from './AuthButton';
import { Button, Skeleton } from '@repo/ui/common';
import { useAuth } from '@/hooks';

export default function Auth() {
	const { user, isLoading, handleSignout } = useAuth();

	return (
		<>
			<div className="flex gap-2 items-center">
				{isLoading && <Skeleton className="w-32 h-12"></Skeleton>}
				{!isLoading && user && (
					<>
						<ProfileButton href="profile" />
						<Button onClick={handleSignout}>로그아웃</Button>
					</>
				)}
				{!isLoading && !user && (
					<>
						<AuthButton href="/signin">로그인</AuthButton>
					</>
				)}
			</div>
		</>
	);
}
