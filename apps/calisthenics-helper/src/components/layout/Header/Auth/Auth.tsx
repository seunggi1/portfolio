'use client';

import ProfileButton from './ProfileButton';
import AuthButton from './AuthButton';
import { Button, Skeleton } from '@repo/ui/common';
import { useAuth } from '@/hooks';
import { PlusCircle } from 'lucide-react';
import Link from 'next/link';

export default function Auth() {
	const { user, isLoading, handleSignout } = useAuth();

	return (
		<>
			<div className="flex gap-2 items-center">
				{isLoading && <Skeleton className="w-32 h-12"></Skeleton>}
				{!isLoading && user && (
					<>
						<Link href="/routines/edit">
							<PlusCircle />
						</Link>
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
