'use client';

import { useActionState } from 'react';
import Link from 'next/link';
import type { SignInFormResponse } from '@/types/auth';
import { Button } from '@repo/ui/common';
import FormInput from '@/components/common/ui/FormInput';
import useAuthForm from '@/hooks/useAuthForm';

type Props = {
	action: (
		state: SignInFormResponse,
		formData: FormData
	) => Promise<SignInFormResponse>;
};

export default function SignInForm({ action }: Props) {
	const [{ success, errors, inputs }, formAction, isPending] = useActionState<
		SignInFormResponse,
		FormData
	>(action, { success: false, errors: {}, inputs: {} });

	useAuthForm(success);

	return (
		<section className="flex items-center justify-center w-full h-full">
			<form
				action={formAction}
				className="flex flex-col justify-center gap-2 px-4 py-2 rounded-md bg-neutral-content w-80"
			>
				<h2 className="text-3xl font-bold text-center">로그인</h2>
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
				<Button disabled={isPending || success} type="submit">
					로그인
				</Button>
				<Link className="text-center text-secondary" href={'/signup'}>
					회원가입
				</Link>
			</form>
		</section>
	);
}
