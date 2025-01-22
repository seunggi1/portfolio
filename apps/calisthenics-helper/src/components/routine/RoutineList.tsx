import { Card } from '@repo/ui/common';
import { Flame } from 'lucide-react';

const items = new Array(5).fill(0);

export default function RoutineList() {
	return (
		<section className="p-2 grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5">
			{items.map((_, i) => (
				<Card key={i}>
					<Card.CardHeader>
						<div className="bg-primary text-white w-full h-[7rem] flex items-center justify-center">{`루틴이미지 #${i + 1}`}</div>
					</Card.CardHeader>
					<Card.CardBody>
						<div className="">
							<p className="font-bold">초보자 상체 루틴</p>
							<p>20분 총 5개의 운동</p>
							<div className="flex ">
								{items.map((v, i) => (
									<Flame
										className="-ml-[0.4rem]"
										key={i}
										fill="#e25822"
										color="#e68a19"
									/>
								))}
							</div>
							<div className="flex mt-2 gap-1">
								<button className="bg-secondary p-1 rounded-full text-xs w-8">
									전신
								</button>
								<button className="bg-secondary p-1 rounded-full text-xs w-8">
									어깨
								</button>
								<button className="bg-secondary p-1 rounded-full text-xs w-8">
									가슴
								</button>
								<button className="bg-secondary p-1 rounded-full text-xs w-8">
									등
								</button>
							</div>
						</div>
					</Card.CardBody>
				</Card>
			))}
		</section>
	);
}
