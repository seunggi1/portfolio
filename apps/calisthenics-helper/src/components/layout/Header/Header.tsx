import Logo from './Logo';
import { Menu } from 'lucide-react';
import Auth from './Auth/Auth';

export default function Header() {
	return (
		<header className="px-4 py-2 border-b">
			<div className="flex items-center justify-between max-w-screen-xl m-auto ">
				<Menu />
				<Logo />
				<Auth />
			</div>
		</header>
	);
}
