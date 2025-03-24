'use client';

import { useActionState } from 'react';
import { SignUpFormResponse } from '@/types/auth';
import { Button } from '@repo/ui/common';
import FormInput from '@/components/common/ui/FormInput';
import useAuthForm from '@/hooks/useAuthForm';

type Props = {
	action: (
		state: SignUpFormResponse,
		formData: FormData
	) => Promise<SignUpFormResponse>;
};

export default function SignUpForm({ action }: Props) {
	const [{ success, errors, inputs }, formAction, isPending] = useActionState<
		SignUpFormResponse,
		FormData
	>(action, { success: false, errors: {}, inputs: {} });

	useAuthForm(success);

	return (
		<section className="flex items-center justify-center w-full h-full px-4 md:px-0">
			<form
				action={formAction}
				className="flex flex-col gap-2 p-4 rounded-md justify-cente bg-neutral-content w-80"
			>
				<h2 className="text-3xl font-bold text-center">회원가입</h2>
				<FormInput
					displayName="별명"
					type="text"
					className="grow"
					id="displayName"
					name="displayName"
					placeholder="최소 3글자 이상 8글자이하"
					minLength={3}
					maxLength={8}
					required
					defaultValue={inputs.displayName}
				/>
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
				<FormInput
					displayName="비밀번호"
					id="password"
					type="password"
					name="password"
					className="grow"
					placeholder=""
					defaultValue={inputs.password}
					error={errors.password}
				/>
				<FormInput
					displayName="비밀번호 확인"
					id="confirm-password"
					type="password"
					name="confirm-password"
					className="grow"
					placeholder=""
					defaultValue={inputs.confirmPassword}
					error={errors.confirmPassword}
				/>
				<Button disabled={isPending || success} type="submit">
					회원가입
				</Button>
			</form>
		</section>
	);
}
