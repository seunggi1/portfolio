'use client';

import { lazy, Suspense } from 'react';
import AuthActionsSkeleton from './AuthActionsSkeleton';

const AuthActions = lazy(() => import('./AuthActions'));

export default function AuthActionsContainer() {
	return (
		<Suspense fallback={<AuthActionsSkeleton />}>
			<AuthActions />
		</Suspense>
	);
}
