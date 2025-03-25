import { updatePasswordAction } from '@/actions/auth/authAction';
import UpdatePasswordForm from './UpdatePasswordForm';

export default function UpdatePassword() {
	return <UpdatePasswordForm action={updatePasswordAction} />;
}
