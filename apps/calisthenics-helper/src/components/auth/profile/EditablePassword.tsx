import { useState } from 'react';
import { FormGroup } from '@/components/common/ui';
import { Button } from '@repo/ui/common';
import PasswordForm from './PasswordForm';

type Props = {
	email?: string;
};

export default function EditablePassword({ email }: Props) {
	const [isEdit, setIsEdit] = useState<boolean>(false);

	const handleSubmit = () => {
		setIsEdit(false);
	};

	return isEdit && email ? (
		<PasswordForm email={email} onSubmit={handleSubmit} />
	) : (
		<FormGroup displayName="비밀번호 변경">
			<div>
				<Button color="primary" onClick={() => setIsEdit(true)}>
					비밀번호 변경
				</Button>
			</div>
		</FormGroup>
	);
}
