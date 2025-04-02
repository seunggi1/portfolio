import { useState } from 'react';
import RoutineEditFormGroup from '@/components/routine/routine-edit/RoutineEditFormGroup';
import DisplayNameForm from './DisplayNameForm';
import { Button } from '@repo/ui/common';

type Props = {
	displayName?: string;
	onSubmit: () => void;
};

export default function EditableDisplayName({ displayName, onSubmit }: Props) {
	const [isEdit, setIsEdit] = useState<boolean>(false);

	const handleSubmit = () => {
		onSubmit();
		setIsEdit(false);
	};

	return isEdit ? (
		<DisplayNameForm displayName={displayName} onSubmit={handleSubmit} />
	) : (
		<RoutineEditFormGroup displayName="별명">
			<span>{displayName}</span>
			<Button color="primary" size="sm" onClick={() => setIsEdit(true)}>
				변경하기
			</Button>
		</RoutineEditFormGroup>
	);
}
