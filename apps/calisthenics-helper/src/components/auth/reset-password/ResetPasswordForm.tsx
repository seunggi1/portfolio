'use client';

import { useActionState } from 'react';
import type { ResetPasswordEmailResponse } from '@/types/auth';
import { Button, Input } from '@repo/ui/common';
import { AuthForm, FormGroup, Loading } from '@/components/common/ui';

type Props = {
	action: (
		state: ResetPasswordEmailResponse,
		formData: FormData
	) => Promise<ResetPasswordEmailResponse>;
};

export default function ResetPasswordForm({ action }: Props) {
	const [{ success, errors, inputs }, formAction, isPending] = useActionState<
		ResetPasswordEmailResponse,
		FormData
	>(action, { success: false, errors: {}, inputs: {} });

	return (
		<AuthForm action={formAction}>
			<h2 className="text-3xl font-bold text-center">비밀번호 초기화</h2>

			<FormGroup
				displayName="이메일"
				htmlFor="displayName"
				error={errors.email}
			>
				<Input
					id="email"
					type="email"
					name="email"
					className="grow"
					placeholder="abcd1234@site.com"
					defaultValue={inputs.email}
				/>
			</FormGroup>
			<Button disabled={isPending || success} type="submit">
				{isPending ? <Loading /> : '초기화 이메일 전송'}
			</Button>
			<span className="text-center text-success">
				{success && '비밀번호 초기화 링크가 전송되었습니다.'}
			</span>
		</AuthForm>
	);
}
