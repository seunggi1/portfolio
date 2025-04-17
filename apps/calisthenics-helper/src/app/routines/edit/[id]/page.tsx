import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { canAccessRoutineEdit } from '@/business';
import RoutineUpdateContainer from '@/components/routine/routine-edit/RoutineUpdateContainer';

export const metadata: Metadata = {
	title: '루틴 수정',
};

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
