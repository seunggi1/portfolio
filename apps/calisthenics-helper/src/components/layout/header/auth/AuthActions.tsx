'use client';

import { MouseEvent } from 'react';
import Link from 'next/link';
import AuthButton from './AuthButton';
import { useAuth } from '@/hooks';
import { UserIcon } from '@/components/common/icon';
import AuthActionsSkeleton from './AuthActionsSkeleton';

export default function AuthActions() {
	const { user, isLoading, handleSignout } = useAuth();

	const handleMenuClick = (e: MouseEvent<HTMLUListElement>) => {
		const target = e.target as HTMLElement;
		if (target.parentElement instanceof HTMLLIElement === false) {
			return;
		}

		const elem = document.activeElement;
		if (elem) {
			(elem as HTMLElement).blur();
		}
	};

	return (
		<>
			<div className="flex items-center gap-2">
				{isLoading && <AuthActionsSkeleton />}
				{!isLoading && user && (
					<>
						<div className="dropdown dropdown-bottom dropdown-end">
							<div tabIndex={0} role="button" className="m-1">
								<UserIcon />
							</div>
							<ul
								tabIndex={0}
								className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
								onClick={handleMenuClick}
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
									<Link href={'/signout'} onClick={handleSignout}>
										로그아웃
									</Link>
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
