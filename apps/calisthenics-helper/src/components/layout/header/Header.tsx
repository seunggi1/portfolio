import { Suspense } from 'react';
import SearchBar from './search/SearchBar';
import Logo from './Logo';
import AuthActionsContainer from './auth/AuthActionsContainer';

export default function Header() {
	return (
		<header className="h-12 px-4 py-2 border-b min-h-12">
			<div className="relative flex items-center justify-between h-full max-w-screen-xl m-auto">
				<Logo />
				<Suspense>
					<SearchBar />
				</Suspense>
				<AuthActionsContainer />
			</div>
		</header>
	);
}
