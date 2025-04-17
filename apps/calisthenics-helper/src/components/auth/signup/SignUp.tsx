import { createUser } from '@/actions';
import SignUpForm from './SignUpForm';

export default async function SignUp() {
	return <SignUpForm action={createUser} />;
}
