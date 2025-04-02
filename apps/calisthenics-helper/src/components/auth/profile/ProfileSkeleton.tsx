import RoutineEditFormGroup from '@/components/routine/routine-edit/RoutineEditFormGroup';
import { Skeleton } from '@repo/ui/common';

export default function ProfileSkeleton() {
	return (
		<div className="py-4 bg-white rounded-lg">
			<RoutineEditFormGroup displayName="">
				<Skeleton className="w-full h-3" />
			</RoutineEditFormGroup>
			<RoutineEditFormGroup displayName="">
				<Skeleton className="w-full h-3" />
			</RoutineEditFormGroup>
		</div>
	);
}
