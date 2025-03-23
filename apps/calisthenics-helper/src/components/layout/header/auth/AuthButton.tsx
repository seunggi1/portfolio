import Link from 'next/link';
import { Button } from '@repo/ui/common';

type Props = {
	href: string;
	children: React.ReactNode;
};

export default function AuthButton({ href, children }: Props) {
	return (
		<Link href={href}>
			<Button color="primary" borderRadius="md" size="sm">
				{children}
			</Button>
		</Link>
	);
}
