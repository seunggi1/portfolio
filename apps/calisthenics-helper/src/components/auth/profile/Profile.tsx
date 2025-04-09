'use client';

import ProfileSkeleton from './ProfileSkeleton';
import FormGroup from '@/components/common/ui/FormGroup';
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
			<FormGroup displayName="이메일">
				<span>{user?.email}</span>
			</FormGroup>
			<EditableDisplayName displayName={user?.displayName} onSubmit={refetch} />
			<EditableProfilePassword email={user?.email} />
			{user?.email && <WithdrawUser email={user.email} onWithdraw={refetch} />}
		</div>
	);
}
