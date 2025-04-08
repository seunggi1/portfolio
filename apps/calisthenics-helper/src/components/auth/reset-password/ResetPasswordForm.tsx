'use client';

import { useActionState } from 'react';
import type { ResetEmailResponse } from '@/types/auth';
import { Button, Input } from '@repo/ui/common';
import RoutineEditFormGroup from '@/components/routine/routine-edit/RoutineEditFormGroup';
import Loading from '@/components/common/ui/Loading';

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
		<section className="flex items-center justify-center w-full h-full bg-gray-100">
			<form
				action={formAction}
				className="flex flex-col justify-center w-full gap-2 px-4 py-2 bg-white rounded-md md:!w-1/2"
			>
				<h2 className="text-3xl font-bold text-center">비밀번호 초기화</h2>

				<RoutineEditFormGroup
					displayName="이메일"
					htmlFor="displayName"
					error={errors.email}
				>
					<Input
						id="email"
						type="email"
						name="email"
						className="grow"
						placeholder="abcd1234@site.com"
						defaultValue={inputs.email}
					/>
				</RoutineEditFormGroup>
				<Button disabled={isPending || success} type="submit">
					{isPending ? <Loading /> : '초기화 이메일 전송'}
				</Button>
				<span className="text-center text-success">
					{success && '비밀번호 초기화 링크가 전송되었습니다.'}
				</span>
			</form>
		</section>
	);
}
