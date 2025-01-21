import { Button } from '@repo/ui/common';
import Logo from './Logo';
import { Menu } from 'lucide-react';

export default function Header() {
	return (
		<header className="flex items-center justify-between p-4 border-b-2">
			<Menu />
			<Logo />
			<Button>로그인</Button>
		</header>
	);
}
