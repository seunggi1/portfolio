import { Button } from '@repo/ui/common';
import Logo from './Logo';
import { Menu } from 'lucide-react';
import Link from 'next/link';

export default function Header() {
	return (
		<header className="px-4 py-2 border-b">
			<div className="flex items-center justify-between max-w-screen-xl m-auto ">
				<Menu />
				<Logo />
				<Link href={'/signin'}>
					<Button color="primary" borderRadius="md">
						로그인
					</Button>
				</Link>
			</div>
		</header>
	);
}
