import { useRoutineEdit } from '@/hooks/useRoutineEdit';
import { NewRoutine } from '@/types/routine';
import { Button } from '@repo/ui/common';
import { useState } from 'react';

type Props = {
	newRoutine: NewRoutine;
};

export default function RoutineEditFinish({ newRoutine }: Props) {
	const [isSave, setIsSave] = useState<boolean>(false);
	const { handleRoutineEdit, data: result, isPending } = useRoutineEdit();

	return (
		<>
			{!isSave && (
				<Button
					onClick={() => {
						handleRoutineEdit(newRoutine);
						setIsSave(true);
					}}
				>
					저장하기
				</Button>
			)}
			{isPending && <>저장중입니다...</>}
			{result && <>성공!!</>}
			{result !== undefined && !result && <>실패</>}
		</>
	);
}
