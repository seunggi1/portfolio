'use client';

import { useActionState } from 'react';
import { SignUpFormResponse } from '@/types/auth';
import { Button, Input } from '@repo/ui/common';
import useAuthForm from '@/hooks/useAuthForm';
import FormGroup from '@/components/common/ui/FormGroup';
import Loading from '@/components/common/ui/Loading';

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
		<section className="flex items-center justify-center w-full h-full px-4 bg-gray-100 md:px-0">
			<form
				action={formAction}
				className="flex flex-col justify-center w-full gap-2 px-4 py-2 bg-white rounded-md md:!w-1/2"
			>
				<h2 className="mb-4 text-3xl font-bold text-center">회원가입</h2>
				<FormGroup
					displayName="별명"
					htmlFor="displayName"
					error={errors.displayName}
				>
					<Input
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
				</FormGroup>
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
						defaultValue={inputs.confirmPassword}
					/>
				</FormGroup>
				<Button disabled={isPending || success} type="submit">
					{isPending ? <Loading /> : '회원가입'}
				</Button>
			</form>
		</section>
	);
}
