import { useRoutines } from '@/hooks';
import useRoutineDetail from '@/hooks/useRoutineDetail';
import { useRoutineEdit } from '@/hooks/useRoutineEdit';
import { NewRoutine } from '@/types/routine';
import { Button } from '@repo/ui/common';
import { useEffect, useState } from 'react';

type Props = {
	newRoutine: NewRoutine;
};

export default function RoutineEditFinish({ newRoutine }: Props) {
	const [isSave, setIsSave] = useState<boolean>(false);
	const {
		handleRoutineEdit,
		data: result,
		isPending,
	} = useRoutineEdit(newRoutine.id);

	return (
		<section className="flex items-center justify-center h-full">
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
		</section>
	);
}
