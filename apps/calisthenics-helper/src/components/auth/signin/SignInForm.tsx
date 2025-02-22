'use client';

import Link from 'next/link';
import { useActionState } from 'react';
import type { SignInFormResponse } from '@/types/auth';
import { Button } from '@repo/ui/common';

type Props = {
	action: (
		state: SignInFormResponse,
		formData: FormData
	) => Promise<SignInFormResponse>;
};

export default function SignInForm({ action }: Props) {
	const [{ success, errors, inputs }, formAction, peding] = useActionState<
		SignInFormResponse,
		FormData
	>(action, { success: false, errors: {}, inputs: {} });

	return (
		<section className="flex items-center justify-center w-full h-full">
			<form
				action={formAction}
				className="flex flex-col justify-center gap-2 px-4 rounded-md bg-neutral-content w-80"
			>
				<h2 className="text-3xl font-bold text-center">로그인</h2>
				<div>
					<label
						htmlFor="email"
						className={[
							'flex items-center gap-2 input input-bordered',
							`${errors.email ? 'border-error' : ''}`,
						].join(' ')}
					>
						이메일
						<input
							id="email"
							type="email"
							name="email"
							className="grow"
							placeholder="abcd1234@site.com"
							defaultValue={inputs.email}
						/>
					</label>
					<span className="text-error">{errors.email}</span>
				</div>
				<Button type="submit">로그인 링크 전송</Button>
				<span className="text-center text-success">
					{success && '로그인 링크가 전송되었습니다.'}
				</span>
				<Link className="text-center text-secondary" href={'/signup'}>
					회원가입
				</Link>
			</form>
		</section>
	);
}
