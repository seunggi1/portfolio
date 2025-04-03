'use client';

import ProfileSkeleton from './ProfileSkeleton';
import RoutineEditFormGroup from '@/components/routine/routine-edit/RoutineEditFormGroup';
import { useAuth } from '@/hooks';
import EditableDisplayName from './EditableDisplayName';
import EditableProfilePassword from './EditablePassword';
import WithdrawUser from './WithdrawUser';

export default function Profile() {
	const { user, isLoading, refetch } = useAuth();

	if (isLoading) {
		return <ProfileSkeleton />;
	}

	return (
		<div className="py-4 bg-white rounded-lg">
			<RoutineEditFormGroup displayName="이메일">
				<span>{user?.email}</span>
			</RoutineEditFormGroup>
			<EditableDisplayName displayName={user?.displayName} onSubmit={refetch} />
			<EditableProfilePassword email={user?.email} />
			{user?.email && <WithdrawUser email={user.email} onWithdraw={refetch} />}
		</div>
	);
}
