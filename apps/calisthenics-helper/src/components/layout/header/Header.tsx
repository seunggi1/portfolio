import AuthActions from './auth/AuthActions';
import SearchBar from './search/SearchBar';
import Logo from './Logo';

export default function Header() {
	return (
		<header className="h-12 px-4 py-2 border-b min-h-12">
			<div className="relative flex items-center justify-between h-full m-auto max-w-screen-xl">
				<Logo />
				<SearchBar />
				<AuthActions />
			</div>
		</header>
	);
}
