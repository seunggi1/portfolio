'use client';

import { lazy, Suspense, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { type RoutineDetail } from '@/types/routine';
import { Button } from '@repo/ui/common';
import RoutineSummary from '../../common/ui/RoutineSummary';
import RoutineLevel from '../../common/ui/RoutineLevel';
import RoutineCategories from '../../common/ui/RoutineCategories';
import ExerciseSetDetails from './ExerciseSetDetails';
import useRoutineDetail from '@/hooks/useRoutineDetail';
import RoutineDetailSkeleton from './RoutineDetailSkeleton';
import { useAuth, useModal } from '@/hooks';
import RoutineUpdateButton from './RoutineUpdateButton';
import { toast } from '@/lib/toast/toast';
import { useRoutineDelete } from '@/hooks/useRoutineDelete';
import CommentsSkeleton from '../comment/CommentsSkeleton';

const Comments = lazy(() => import('../comment/Comments'));

type Props = {
	id: string;
};

export default function RoutineDetail({ id }: Props) {
	const { routineDetail, isLoading } = useRoutineDetail(id);
	const { user } = useAuth();
	const { result: deleteResult, handleRoutineDelete } = useRoutineDelete(id);
	const router = useRouter();
	const { Modal, hideModal, showModal } = useModal();

	useEffect(() => {
		if (deleteResult) {
			toast.info('루틴이 삭제되었습니다.');
			router.push('/');
		}
	}, [deleteResult, router]);

	if (isLoading || !routineDetail) {
		return <RoutineDetailSkeleton />;
	}

	const handleDelete = () => {
		handleRoutineDelete();
		hideModal();
	};

	const { categoryNames, difficultyLevel, name, imageURL } = routineDetail;

	return (
		<>
			<section className="max-w-screen-xl grid-cols-2 m-auto md:grid gap-x-2">
				<div className="basis-[60%] w-full">
					<div className="flex items-center justify-center text-white bg-black h-80">
						{imageURL ? (
							<div className="relative w-full h-full">
								<Image src={imageURL} alt={name} fill={true} />
							</div>
						) : (
							<span className="text-4xl font-bold">{name}</span>
						)}
					</div>
					<div className="flex flex-col gap-1 p-2 mb-4">
						<RoutineSummary {...routineDetail} />
						<RoutineLevel level={difficultyLevel} />
						<RoutineCategories categoryNames={categoryNames} />
						<Link href={`/routines/${id}/run`}>
							<Button className="w-full">시작하기</Button>
						</Link>
						{user && user.id === routineDetail.userID && (
							<>
								<RoutineUpdateButton id={routineDetail.id} />
								<Button color="error" onClick={showModal}>
									루틴 삭제
								</Button>
								<Modal title="정말 루틴을 삭제하시겠습니까?">
									<Button onClick={handleDelete} color="error">
										삭제
									</Button>
								</Modal>
							</>
						)}
					</div>
				</div>
				<div className="basis-[40%] w-full text-center">
					<ExerciseSetDetails {...routineDetail} />
				</div>
				<div className="px-2 md:col-span-2">
					<Suspense fallback={<CommentsSkeleton />}>
						<Comments routineID={id} />
					</Suspense>
				</div>
			</section>
		</>
	);
}
