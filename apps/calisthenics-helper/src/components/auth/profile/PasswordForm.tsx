import { useActionState, useEffect } from 'react';
import { updateProfilePasswordAction } from '@/actions';
import Loading from '@/components/common/ui/Loading';
import FormGroup from '@/components/common/ui/FormGroup';
import { UpdateProfilePasswordResponse } from '@/types/auth';
import { Button, Input } from '@repo/ui/common';

type Props = {
	email: string;
	onSubmit: () => void;
};

export default function PasswordForm({ email, onSubmit }: Props) {
	const [{ success, errors, inputs }, formAction, isPending] = useActionState<
		UpdateProfilePasswordResponse,
		FormData
	>(updateProfilePasswordAction.bind(null, email), {
		success: false,
		inputs: {},
		errors: {},
	});

	useEffect(() => {
		let timer: number | undefined;
		if (success) {
			timer = window.setTimeout(onSubmit, 1500);
		}
		return () => window.clearTimeout(timer);
	}, [success, onSubmit]);

	return (
		<form action={formAction}>
			<FormGroup displayName="비밀번호 변경">
				<FormGroup
					displayName="현재 비밀번호"
					addDivider={false}
					htmlFor="password"
					error={errors.password}
				>
					<Input
						type="password"
						id="password"
						name="password"
						defaultValue={inputs.password}
						required
					/>
				</FormGroup>
				<FormGroup
					displayName="새 비밀번호"
					addDivider={false}
					htmlFor="new-password"
					error={errors.newPassword}
				>
					<Input
						type="password"
						id="new-password"
						name="new-password"
						defaultValue={inputs.newPassword}
						required
					/>
				</FormGroup>
				<FormGroup
					displayName="새 비밀번호 확인"
					addDivider={false}
					htmlFor="new-confirm-password"
					error={errors.newConfirmPassword}
				>
					<Input
						type="password"
						id="new-confirm-password"
						name="new-confirm-password"
						className="new-confirm-password"
						defaultValue={inputs.newConfirmPassword}
						required
					/>
				</FormGroup>
				<FormGroup displayName="" addDivider={false}>
					<Button type="submit" size="sm" disabled={isPending || success}>
						{isPending || success ? <Loading /> : '변경'}
					</Button>
					{success && (
						<span className="text-success">변경이 완료되었습니다.</span>
					)}
				</FormGroup>
			</FormGroup>
		</form>
	);
}
