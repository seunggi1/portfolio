'use client';

import { useActionState } from 'react';
import Link from 'next/link';
import type { SignInFormResponse } from '@/types/auth';
import { Button, Input } from '@repo/ui/common';
import useAuthForm from '@/hooks/useAuthForm';
import FormGroup from '@/components/common/ui/FormGroup';
import Loading from '@/components/common/ui/Loading';

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
		<section className="flex items-center justify-center w-full h-full bg-gray-100">
			<form
				action={formAction}
				className="flex flex-col justify-center w-full gap-2 px-4 py-2 bg-white rounded-md md:!w-1/2"
			>
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
			</form>
		</section>
	);
}
