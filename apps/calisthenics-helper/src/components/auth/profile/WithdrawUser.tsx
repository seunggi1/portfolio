import { withdrawAction } from '@/actions/auth/authAction';
import Loading from '@/components/common/ui/Loading';
import RoutineEditFormGroup from '@/components/routine/routine-edit/RoutineEditFormGroup';
import { useModal } from '@/hooks';
import { WithdrawResponse } from '@/types/auth';
import { Button, Input } from '@repo/ui/common';
import { useRouter } from 'next/navigation';
import { useActionState, useEffect } from 'react';

type Props = {
	email: string;
	onWithdraw: () => void;
};

export default function WithdrawUser({ email, onWithdraw }: Props) {
	const { Modal, showModal, hideModal } = useModal();
	const [{ success, errors, inputs }, formAction, isPending] = useActionState<
		WithdrawResponse,
		FormData
	>(withdrawAction.bind(null, email), {
		success: false,
		errors: {},
		inputs: {},
	});

	const router = useRouter();

	useEffect(() => {
		if (success) {
			router.push('/');
			hideModal();
			onWithdraw();
		}
	}, [success, router, hideModal, onWithdraw]);

	return (
		<div className="p-4">
			<Button className="w-full" color="error" onClick={() => showModal()}>
				회원 탈퇴
			</Button>
			<Modal title={`회원 탈퇴를 위해 이메일 주소를 입력해주세요.`}>
				<form action={formAction} className="w-full">
					<RoutineEditFormGroup
						addDivider={false}
						displayName="이메일 입력"
						htmlFor="confirm-email"
						error={errors.confirmEmail}
					>
						<Input
							type="email"
							name="confirm-email"
							className="mb-2"
							defaultValue={inputs.confirmEmail}
							placeholder={email}
							required
						/>
						<Button
							className="w-full"
							color="error"
							type="submit"
							disabled={isPending || success}
						>
							{isPending || success ? <Loading /> : '회원탈퇴'}
						</Button>
					</RoutineEditFormGroup>
				</form>
			</Modal>
		</div>
	);
}
