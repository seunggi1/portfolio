import { updatePasswordAction } from '@/actions/auth/authAction';
import UpdatePasswordForm from './UpdatePasswordForm';

type Props = {
	token: string;
	email: string;
};

export default function UpdatePassword({ token, email }: Props) {
	return (
		<UpdatePasswordForm
			action={updatePasswordAction.bind(null, token, email)}
		/>
	);
}
