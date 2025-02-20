import { sendSignInEmail } from '@/actions/auth';
import SignInForm from './SignInForm';

export default function SignIn() {
	return <SignInForm action={sendSignInEmail} />;
}
