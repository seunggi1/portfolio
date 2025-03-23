import AuthActions from './auth/AuthActions';
import SearchBar from './search/SearchBar';
import Logo from './Logo';

export default function Header() {
	return (
		<header className="h-12 px-4 py-2 border-b min-h-12">
			<div className="relative flex items-center justify-between h-full max-w-screen-xl m-auto">
				<Logo />
				<SearchBar />
				<AuthActions />
			</div>
		</header>
	);
}
