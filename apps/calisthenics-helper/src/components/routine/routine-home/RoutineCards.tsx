import Image from 'next/image';
import Link from 'next/link';
import type { Routine } from '@/types/routine';
import { Card } from '@repo/ui/common';
import RoutineLevel from '../ui/RoutineLevel';
import RoutineCategories from '../ui/RoutineCategories';
import RoutineSummary from '../ui/RoutineSummary';

type Props = {
	routines: Routine[];
};

export default function RoutineCards({ routines }: Props) {
	return (
		<section className="max-w-screen-xl m-auto px-8 pt-4 grid gap-x-4 gap-y-6 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
			{routines.map((routine) => (
				<Link key={routine.id} href={`/routines/${routine.id}`}>
					<Card>
						<Card.CardHeader>
							<div className="text-white w-full h-[8rem] flex items-center justify-center relative">
								<Image
									src={routine.imageURL ? routine.imageURL : '/push-up.png'}
									alt="doing pull-up man"
									className="absolute"
									fill={true}
								/>
							</div>
						</Card.CardHeader>
						<Card.CardBody>
							<RoutineSummary {...routine} />
							<RoutineLevel level={routine.difficultyLevel} />
							<RoutineCategories categoryNames={routine.categoryNames} />
						</Card.CardBody>
					</Card>
				</Link>
			))}
		</section>
	);
}
