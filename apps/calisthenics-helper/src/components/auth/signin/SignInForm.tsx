'use client';

import { useActionState } from 'react';
import Link from 'next/link';
import type { SignInFormResponse } from '@/types/auth';
import { Button, Input } from '@repo/ui/common';
import { AuthForm, FormGroup, Loading } from '@/components/common/ui';
import { useAuthForm } from '@/hooks';

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
		<AuthForm action={formAction}>
			<h2 className="text-3xl font-bold text-center">로그인</h2>
			<FormGroup displayName="이메일" htmlFor="email" error={errors.email}>
				<Input
					id="email"
					type="email"
					name="email"
					className="grow"
					placeholder="abcd1234@site.com"
					required
					defaultValue={inputs.email}
				/>
			</FormGroup>

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
					defaultValue={inputs.password}
				/>
			</FormGroup>
			<Button disabled={isPending || success} type="submit">
				{isPending ? <Loading /> : '로그인'}
			</Button>
			<Link className="text-center text-secondary" href={'/signup'}>
				회원가입
			</Link>
			<Link className="text-center text-secondary" href={'/reset-password'}>
				비밀번호 초기화
			</Link>
		</AuthForm>
	);
}
