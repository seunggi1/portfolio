import { useState } from 'react';
import { useRoutines } from '@/hooks';
import { UpdateRoutine } from '@/types/routine';
import { Button } from '@repo/ui/common';

type Props = {
	updateRoutine: UpdateRoutine;
};

export default function RoutineUpdateFinish({ updateRoutine }: Props) {
	const [isSave, setIsSave] = useState<boolean>(false);
	const {
		update: { handleUpdateRoutine, isPending, result },
	} = useRoutines();

	return (
		<section className="flex items-center justify-center h-full">
			{!isSave && (
				<Button
					onClick={() => {
						handleUpdateRoutine(updateRoutine);
						setIsSave(true);
					}}
				>
					저장하기
				</Button>
			)}
			{isPending && <>업데이트 중입니다...</>}
			{result && <>성공!!</>}
			{result !== undefined && !result && <>실패</>}
		</section>
	);
}
