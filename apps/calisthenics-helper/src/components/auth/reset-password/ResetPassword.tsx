import { resetPasswordAction } from '@/actions';
import ResetPasswordForm from './ResetPasswordForm';

export default function ResetPassword() {
	return <ResetPasswordForm action={resetPasswordAction} />;
}
