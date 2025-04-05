'use client';

import Link from 'next/link';
import AuthButton from './AuthButton';
import { Skeleton } from '@repo/ui/common';
import { useAuth } from '@/hooks';
import { UserIcon } from '@/components/common/icon';

export default function AuthActions() {
	const { user, isLoading, handleSignout } = useAuth();

	return (
		<>
			<div className="flex items-center gap-2">
				{isLoading && <Skeleton className="w-16 h-6 shrink-0" />}
				{!isLoading && user && (
					<>
						<div className="dropdown dropdown-bottom dropdown-end">
							<div tabIndex={0} role="button" className="m-1ß">
								<UserIcon />
							</div>
							<ul
								tabIndex={0}
								className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
							>
								<li>
									<Link href={'/profile'}>내 정보</Link>
								</li>
								<li>
									<Link href="/routines/edit?progress=routine">
										루틴 추가 하기
									</Link>
								</li>
								<li>
									<Link href={'/contact'}>문의하기</Link>
								</li>
								<li>
									<span onClick={handleSignout}>로그아웃</span>
								</li>
							</ul>
						</div>
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
