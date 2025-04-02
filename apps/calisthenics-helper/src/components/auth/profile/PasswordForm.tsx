import { useActionState, useEffect } from 'react';
import { updateProfilePasswordAction } from '@/actions/auth/authAction';
import Loading from '@/components/common/ui/Loading';
import RoutineEditFormGroup from '@/components/routine/routine-edit/RoutineEditFormGroup';
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
			<RoutineEditFormGroup displayName="비밀번호 변경">
				<RoutineEditFormGroup
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
				</RoutineEditFormGroup>
				<RoutineEditFormGroup
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
				</RoutineEditFormGroup>
				<RoutineEditFormGroup
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
				</RoutineEditFormGroup>
				<RoutineEditFormGroup displayName="" addDivider={false}>
					<Button type="submit" size="sm" disabled={isPending || success}>
						{isPending || success ? <Loading /> : '변경'}
					</Button>
					{success && (
						<span className="text-success">변경이 완료되었습니다.</span>
					)}
				</RoutineEditFormGroup>
			</RoutineEditFormGroup>
		</form>
	);
}
