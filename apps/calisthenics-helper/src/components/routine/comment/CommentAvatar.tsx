import { User } from '@/types/auth';
import { Avatar } from '@repo/ui/common';

type Props = {
	displayName: User['displayName'];
};

export default function CommentAvatar({ displayName }: Props) {
	return (
		<>
			<Avatar size={'xs'}>{displayName[0]}</Avatar>
		</>
	);
}
