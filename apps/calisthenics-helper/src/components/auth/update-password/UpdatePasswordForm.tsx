'use client';

import { useActionState } from 'react';
import type { UpdatePasswordResponse } from '@/types/auth';
import { Button, Input } from '@repo/ui/common';
import FormGroup from '@/components/common/ui/FormGroup';
import Loading from '@/components/common/ui/Loading';
import useAuthForm from '@/hooks/useAuthForm';

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

	useAuthForm(success);

	return (
		<section className="flex items-center justify-center w-full h-full bg-gray-100">
			<form
				action={formAction}
				className="flex flex-col justify-center w-full gap-2 px-4 py-2 bg-white rounded-md md:!w-1/2"
			>
				<h2 className="text-3xl font-bold text-center">비밀번호 변경</h2>
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
					{isPending ? <Loading /> : '비밀번호 변경'}
				</Button>
			</form>
		</section>
	);
}
