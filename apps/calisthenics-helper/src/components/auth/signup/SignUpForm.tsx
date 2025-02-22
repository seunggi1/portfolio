'use client';

import { useActionState } from 'react';
import { SignUpFormResponse } from '@/types/auth';
import { Button } from '@repo/ui/common';

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

	return (
		<section className="flex items-center justify-center w-full h-full px-4 md:px-0">
			<form
				action={formAction}
				className="flex flex-col justify-cente gap-2 p-4 rounded-md bg-neutral-content w-full md:w-1/2"
			>
				<h2 className="text-3xl font-bold text-center">회원가입</h2>
				<div className="space-y-2">
					<label
						htmlFor="displayName"
						className={[
							'flex items-center gap-2 input input-bordered',
							`${errors.displayName ? 'border-error' : ''}`,
						].join(' ')}
					>
						별명
						<input
							type="text"
							className="grow"
							id="displayName"
							name="displayName"
							placeholder="최소 3글자 이상 8글자이하"
							// minLength={3}
							// maxLength={8}
							required
							defaultValue={inputs.displayName}
						/>
					</label>
					<span className="text-error">{errors.displayName}</span>
				</div>
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
				<Button aria-disabled={isPending} type="submit">
					회원가입 링크 전송
				</Button>
				<span className="text-center text-success">
					{success && '회원가입 링크가 전송되었습니다.'}
				</span>
			</form>
		</section>
	);
}
