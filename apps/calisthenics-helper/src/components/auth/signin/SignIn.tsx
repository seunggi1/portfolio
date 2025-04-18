import { signInAction } from '@/actions';
import SignInForm from './SignInForm';

export default function SignIn() {
	return <SignInForm action={signInAction} />;
}
