import { redirect } from 'next/navigation';
import { canAccessRoutineEdit } from '@/actions/auth/authBusiness';
import RoutineUpdateContainer from '@/components/routine/routine-edit/RoutineUpdateContainer';

type Props = {
	params: Promise<{ id: string }>;
};

export default async function RoutineUpdatePage({ params }: Props) {
	const { id } = await params;
	const canAccess = await canAccessRoutineEdit(id);

	if (!canAccess) {
		return redirect('/403');
	}

	return <RoutineUpdateContainer routineID={id} />;
}
