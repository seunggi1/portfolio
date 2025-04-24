const KEY = 'isLogin';

export function useSession() {
	return {
		login: sessionStorage.getItem(KEY) === 'true',
		saveLogin: () => sessionStorage.setItem(KEY, 'true'),
	};
}
