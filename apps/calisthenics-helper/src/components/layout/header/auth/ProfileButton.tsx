import { User } from 'lucide-react';
import Link from 'next/link';

type Props = {
	href: string;
};

export default function ProfileButton({ href }: Props) {
	return (
		<Link href={href}>
			<User size={32} />
		</Link>
	);
}
