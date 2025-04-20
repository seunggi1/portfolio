'use client';

import { useActionState } from 'react';
import Link from 'next/link';
import { saveCompletedRoutineAction } from '@/actions';
import { Button } from '@repo/ui/common';
import { useAuth } from '@/hooks';
import {
	CompletedRoutineResponse,
	CompletedRoutine,
	Routine,
} from '@/types/routine';
import { Loading } from '@/components/common/ui';

type Props = {
	routineID: Routine['id'];
};

export default function RoutineEnd({ routineID }: Props) {
	const { user } = useAuth();
	const [{ status }, action, isPending] = useActionState<
		CompletedRoutineResponse,
		CompletedRoutine
	>(saveCompletedRoutineAction, {
		routineID,
	});

	return (
		<div className="flex flex-col gap-4 p-2 text-center rounded-md">
			<p className="font-bold">루틴이 종료 되었습니다</p>
			<Link href={'/'}>
				<Button>메인 페이지로</Button>
			</Link>
			{user && (
				<form action={() => action({ routineID })}>
					<Button
						className="w-24"
						disabled={isPending || status === 'success'}
						color="success"
						type="submit"
					>
						{isPending ? <Loading /> : '결과 저장'}
					</Button>
					{status === 'error' && (
						<p className="mt-4 text-error">
							결과 저장에 실패했습니다. 잠시 후 다시 시도해주세요.
						</p>
					)}
					{status === 'success' && (
						<p className="mt-4 text-success">결과 저장이 완료되었습니다.</p>
					)}
				</form>
			)}
		</div>
	);
}
