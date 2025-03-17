import { NewRoutineBase, RoutineEdit } from '@/types/routine';
import RoutineBaseForm from './RoutineBaseForm';
import { useRoutineCategories } from '@/hooks';

type Props = {
	data: NewRoutineBase;
	onComplete: (routinBase: NewRoutineBase) => void;
};

export default function RoutineBaseEdit({ data, onComplete }: Props) {
	const { routineCategories } = useRoutineCategories();

	return (
		<RoutineBaseForm
			onSubmit={(routineEdit: RoutineEdit) =>
				onComplete({ ...routineEdit, id: data.id })
			}
			defaultValue={data}
			routineCategories={routineCategories}
		/>
	);
}
