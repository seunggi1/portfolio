import AuthActions from './auth/AuthActions';
import Logo from './Logo';
import { Menu } from 'lucide-react';

export default function Header() {
	return (
		<header className="px-4 py-2 border-b">
			<div className="relative flex items-center justify-between max-w-screen-xl m-auto">
				<Menu />
				<Logo />
				<AuthActions />
			</div>
		</header>
	);
}
