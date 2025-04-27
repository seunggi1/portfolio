import { useState } from 'react';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import { useSession } from '@/hooks/useSession';
import { ErrorBoundary } from './components/ErrorBoundary';
import Error from './components/Error';

function App() {
	const { login, saveLogin } = useSession();
	const [isLogin, setIsLogin] = useState<boolean>(login);

	const handleOnSuccess = () => {
		saveLogin();
		setIsLogin(true);
	};

	return (
		<div className="w-full h-screen" data-theme="corporate">
			<ErrorBoundary fallback={<Error />}>
				{isLogin ? (
					<Dashboard />
				) : (
					<Login onSuccess={() => handleOnSuccess()} />
				)}
			</ErrorBoundary>
		</div>
	);
}

export default App;
