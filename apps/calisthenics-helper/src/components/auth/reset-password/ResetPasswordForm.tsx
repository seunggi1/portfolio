'use client';

import { useActionState } from 'react';
import type { ResetEmailResponse } from '@/types/auth';
import { Button } from '@repo/ui/common';
import FormInput from '@/components/common/ui/FormInput';
import useAuthForm from '@/hooks/useAuthForm';

type Props = {
	action: (
		state: ResetEmailResponse,
		formData: FormData
	) => Promise<ResetEmailResponse>;
};

export default function ResetPasswordForm({ action }: Props) {
	const [{ success, errors, inputs }, formAction, isPending] = useActionState<
		ResetEmailResponse,
		FormData
	>(action, { success: false, errors: {}, inputs: {} });

	return (
		<section className="flex items-center justify-center w-full h-full">
			<form
				action={formAction}
				className="flex flex-col justify-center gap-2 px-4 py-2 rounded-md bg-neutral-content w-80"
			>
				<h2 className="text-3xl font-bold text-center">비밀번호 초기화</h2>
				<FormInput
					displayName="이메일"
					id="email"
					type="email"
					name="email"
					className="grow"
					placeholder="abcd1234@site.com"
					defaultValue={inputs.email}
					error={errors.email}
				/>
				<Button disabled={isPending || success} type="submit">
					초기화 링크 전송
				</Button>
				<span className="text-center text-success">
					{success && '비밀번호 초기화 링크가 전송되었습니다.'}
				</span>
			</form>
		</section>
	);
}
