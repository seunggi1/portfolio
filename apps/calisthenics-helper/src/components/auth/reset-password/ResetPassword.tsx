import { resetPasswordAction } from '@/actions/auth/authAction';
import ResetPasswordForm from './ResetPasswordForm';

export default function ResetPassword() {
	return <ResetPasswordForm action={resetPasswordAction} />;
}
