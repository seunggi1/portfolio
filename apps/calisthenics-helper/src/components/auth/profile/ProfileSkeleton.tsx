import { FormGroup } from '@/components/common/ui';
import { Skeleton } from '@repo/ui/common';

export default function ProfileSkeleton() {
	return (
		<div className="py-4 bg-white rounded-lg">
			<FormGroup displayName="">
				<Skeleton className="w-full h-3" />
			</FormGroup>
			<FormGroup displayName="">
				<Skeleton className="w-full h-3" />
			</FormGroup>
		</div>
	);
}
