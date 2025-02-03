import { Routine } from '@/types/routine';
import { Button, Card } from '@repo/ui/common';
import { Flame } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

type Props = {
	routines: Routine[];
};

export default function RoutineCards({ routines }: Props) {
	return (
		<section className="max-w-screen-xl m-auto px-8 pt-4 grid gap-x-4 gap-y-6 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
			{routines.map((routine, i) => (
				<Link key={routine.id} href={`/routines/${routine.id}`}>
					<Card>
						<Card.CardHeader>
							<div className="text-white w-full h-[8rem] flex items-center justify-center relative">
								<Image
									src={routine.imageURL ?? '/push-up.png'}
									alt="doing pull-up man"
									className="absolute"
									fill={true}
								/>
							</div>
						</Card.CardHeader>
						<Card.CardBody>
							<div className="">
								<p className="font-bold">{routine.name}</p>
								<p>
									{`약 ${routine.totalMinutes}분 총 ${routine.totalExerciseCount}개의 운동 `}
								</p>
								<div className="flex ">
									{Array.from({ length: routine.difficultyLevel }).map(
										(_, flameIndex) => (
											<Flame
												className="-ml-[0.4rem]"
												key={flameIndex}
												fill="#EE3A34"
												color="#EE3A34"
											/>
										)
									)}
								</div>
								<div className="flex mt-2 gap-1">
									{routine.categoryNames.map((categoryName, i) => (
										<Button
											key={categoryName}
											color="secondary"
											borderRadius="full"
											size="xs"
											className="max-w-10"
										>
											{categoryName}
										</Button>
									))}
								</div>
							</div>
						</Card.CardBody>
					</Card>
				</Link>
			))}
		</section>
	);
}
