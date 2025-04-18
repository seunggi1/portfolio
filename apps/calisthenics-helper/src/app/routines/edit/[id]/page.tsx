import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { createAuthBusiness } from '@/business';
import RoutineUpdateContainer from '@/components/routine/routine-edit/RoutineUpdateContainer';

export const metadata: Metadata = {
	title: '루틴 수정',
};

type Props = {
	params: Promise<{ id: string }>;
};

export default async function RoutineUpdatePage({ params }: Props) {
	const { id } = await params;
	const authBusiness = await createAuthBusiness();
	const canAccess = await authBusiness.canAccessRoutineEdit(id);

	if (!canAccess) {
		return redirect('/403');
	}

	return <RoutineUpdateContainer routineID={id} />;
}
