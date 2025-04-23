'use client';

import ProfileSkeleton from './ProfileSkeleton';
import { useAuth } from '@/hooks';
import { FormGroup } from '@/components/common/ui';
import EditableDisplayName from './EditableDisplayName';
import EditableProfilePassword from './EditablePassword';
import WithdrawUser from './WithdrawUser';
import ProfileContainer from './ProfileContainer';

export default function Profile() {
	const { user, isLoading, refetch } = useAuth();

	return (
		<ProfileContainer path="profile">
			{isLoading && <ProfileSkeleton />}
			{!isLoading && (
				<>
					<FormGroup displayName="이메일">
						<span>{user?.email}</span>
					</FormGroup>
					<EditableDisplayName
						displayName={user?.displayName}
						onSubmit={refetch}
					/>
					<EditableProfilePassword email={user?.email} />
					{user?.email && (
						<WithdrawUser email={user.email} onWithdraw={refetch} />
					)}
				</>
			)}
		</ProfileContainer>
	);
}
