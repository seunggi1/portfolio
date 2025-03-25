'use client';

import { useActionState } from 'react';
import type { UpdatePasswordResponse } from '@/types/auth';
import { Button } from '@repo/ui/common';
import FormInput from '@/components/common/ui/FormInput';
import useAuthForm from '@/hooks/useAuthForm';
import Link from 'next/link';

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

	return (
		<section className="flex items-center justify-center w-full h-full">
			<form
				action={formAction}
				className="flex flex-col justify-center gap-2 p-4 rounded-md bg-neutral-content w-80"
			>
				<h2 className="text-3xl font-bold text-center">비밀번호 변경</h2>
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
					비밀번호 변경
				</Button>
				{success && (
					<>
						<span className="text-center text-success">
							비밀번호 변경이 완료 되었습니다.
						</span>
						<Link className="text-center text-secondary" href={'/signin'}>
							<Button>로그인 페이지로</Button>
						</Link>
					</>
				)}
			</form>
		</section>
	);
}
