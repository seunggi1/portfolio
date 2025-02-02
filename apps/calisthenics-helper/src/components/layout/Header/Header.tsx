import { Button } from '@repo/ui/common';
import Logo from './Logo';
import { Menu } from 'lucide-react';

export default function Header() {
	return (
		<header className="border-b px-4 py-2">
			<div className="max-w-screen-xl m-auto flex items-center justify-between ">
				<Menu />
				<Logo />
				<Button color="primary" borderRadius="md">
					로그인
				</Button>
			</div>
		</header>
	);
}
