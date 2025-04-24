import { useState } from 'react';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import { useSession } from '@/hooks/useSession';

function App() {
	const { login, saveLogin } = useSession();
	const [isLogin, setIsLogin] = useState<boolean>(login);

	const handleOnSuccess = () => {
		saveLogin();
		setIsLogin(true);
	};

	return (
		<div className="w-full h-screen" data-theme="corporate">
			{isLogin ? <Dashboard /> : <Login onSuccess={() => handleOnSuccess()} />}
		</div>
	);
}

export default App;
