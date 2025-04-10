import Link from 'next/link';
import { Carousel } from '@repo/ui/common';

export default function RoutineBanners() {
	return (
		<div className="max-w-screen-xl m-auto h-[20rem]">
			<Carousel className="w-full h-full">
				<Carousel.Item id="fullbody-routine" className="flex w-full text-white">
					<Link
						href={`/api/routines/recommand?type=1`}
						className="flex flex-col items-center justify-center w-full text-3xl bg-primary font-bold"
					>
						<span>오늘의 전신 루틴</span>
					</Link>
				</Carousel.Item>
				<Carousel.Item
					id="upperbody-routine"
					className="flex w-full text-white"
				>
					<Link
						href={`/api/routines/recommand?type=2`}
						className="flex flex-col items-center justify-center w-full text-3xl bg-success font-bold"
					>
						<span>오늘의 상체 루틴</span>
					</Link>
				</Carousel.Item>
				<Carousel.Item
					id="lowerbody-routine"
					className="flex w-full text-white"
				>
					<Link
						href={`/api/routines/recommand?type=3`}
						className="flex flex-col items-center justify-center w-full text-3xl bg-info font-bold"
					>
						<span>오늘의 하체 루틴</span>
					</Link>
				</Carousel.Item>
			</Carousel>
		</div>
	);
}
