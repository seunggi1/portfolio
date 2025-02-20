import { createUser } from '@/actions/auth';
import SignUpForm from './SignUpForm';

export default async function SignUp() {
	return <SignUpForm action={createUser} />;
}
