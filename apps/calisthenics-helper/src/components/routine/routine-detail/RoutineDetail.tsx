'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { type RoutineDetail } from '@/types/routine';
import { Button } from '@repo/ui/common';
import RoutineSummary from '../ui/RoutineSummary';
import RoutineLevel from '../ui/RoutineLevel';
import RoutineCategories from '../ui/RoutineCategories';
import ExerciseSetDetails from './ExerciseSetDetails';
import useRoutineDetail from '@/hooks/useRoutineDetail';
import RoutineDetailSkeleton from './RoutineDetailSkeleton';
import { useAuth } from '@/hooks';
import RoutineUpdateButton from './RoutineUpdateButton';
import Modal from '@/components/common/modal/Modal';
import { useRouter } from 'next/navigation';
import { toast } from '@/lib/toast/toast';

type Props = {
	id: string;
};

export default function RoutineDetail({ id }: Props) {
	const { routineDetail, isLoading, error, deleteInfo } = useRoutineDetail(id);
	const { user } = useAuth();
	const [openModal, setOpenModal] = useState<boolean>(false);
	const router = useRouter();

	useEffect(() => {
		if (deleteInfo.result) {
			toast.info('루틴이 삭제되었습니다.');
			router.push('/');
		}
	}, [deleteInfo.result]);

	if (isLoading || !routineDetail) {
		return <RoutineDetailSkeleton />;
	}

	const handleDelete = () => {
		deleteInfo.handleRoutineDelete();
		setOpenModal(false);
	};

	const {
		categoryNames,
		difficultyLevel,
		name,
		totalExerciseCount,
		totalMinutes,
		imageURL,
	} = routineDetail;

	return (
		<>
			<section className="max-w-screen-xl m-auto md:flex gap-x-2">
				<div className="basis-[60%] w-full">
					<div className="flex items-center justify-center text-white bg-black h-80">
						{imageURL ? (
							<Image src={imageURL} alt={name} />
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
								<Button color="error" onClick={() => setOpenModal(true)}>
									루틴 삭제
								</Button>
								{openModal && (
									<Modal
										title="정말 루틴을 삭제하시겠습니까?"
										onClose={() => setOpenModal(false)}
									>
										<Button onClick={handleDelete} color="error">
											삭제
										</Button>
									</Modal>
								)}
							</>
						)}
					</div>
				</div>
				<div className="basis-[40%] w-full text-center">
					<ExerciseSetDetails {...routineDetail} />
				</div>
			</section>
		</>
	);
}
