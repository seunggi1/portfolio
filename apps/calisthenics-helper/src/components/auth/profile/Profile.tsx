'use client';

import ProfileSkeleton from './ProfileSkeleton';
import RoutineEditFormGroup from '@/components/routine/routine-edit/RoutineEditFormGroup';
import { useAuth } from '@/hooks';
import { Button } from '@repo/ui/common';
import EditableDisplayName from './EditableDisplayName';
import EditableProfilePassword from './EditablePassword';

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
			<div className="p-4">
				<Button className="w-full" color="error">
					회원 탈퇴
				</Button>
			</div>
		</div>
	);
}
