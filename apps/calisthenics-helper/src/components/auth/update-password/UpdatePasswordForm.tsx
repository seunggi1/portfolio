'use client';

import { useActionState } from 'react';
import type { UpdatePasswordResponse } from '@/types/auth';
import { Button, Input } from '@repo/ui/common';
import { AuthForm, FormGroup, Loading } from '@/components/common/ui';
import { useAuthForm } from '@/hooks';

type Props = {
	action: (
		state: UpdatePasswordResponse,
		formData: FormData
	) => Promise<UpdatePasswordResponse>;
};

export default function UpdatePasswordForm({ action }: Props) {
	const [{ success, errors, inputs }, formAction, isPending] = useActionState<
		UpdatePasswordResponse,
		FormData
	>(action, { success: false, errors: {}, inputs: {} });

	useAuthForm(success);

	return (
		<AuthForm action={formAction}>
			<h2 className="text-3xl font-bold text-center">비밀번호 변경</h2>
			<FormGroup
				displayName="비밀번호"
				htmlFor="password"
				error={errors.password}
			>
				<Input
					id="password"
					type="password"
					name="password"
					className="grow"
					placeholder=""
					required
					autoComplete="new-password"
					defaultValue={inputs.password}
				/>
			</FormGroup>
			<FormGroup
				displayName="비밀번호 확인"
				htmlFor="confirm-password"
				error={errors.confirmPassword}
			>
				<Input
					id="confirm-password"
					type="password"
					name="confirm-password"
					className="grow"
					placeholder=""
					required
					autoComplete="new-password"
					defaultValue={inputs.confirmPassword}
				/>
			</FormGroup>
			<Button disabled={isPending || success} type="submit">
				{isPending ? <Loading /> : '비밀번호 변경'}
			</Button>
		</AuthForm>
	);
}
