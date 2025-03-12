import Link from 'next/link';
import { Carousel } from '@repo/ui/common';

export default function RoutineBanners() {
	return (
		<div className="max-w-screen-xl m-auto h-[20rem]">
			<Carousel className="w-full h-full">
				<Carousel.Item
					id="recommand-routine"
					className="relative flex w-full text-white"
				>
					<Link
						href="/"
						className="flex flex-col items-center justify-center w-full text-3xl bg-primary"
					>
						<span>오늘의 추천 </span>
						<span>상체 루틴</span>
					</Link>
					<Link
						href="/"
						className="flex flex-col items-center justify-center w-full text-3xl bg-secondary"
					>
						<span>오늘의 추천</span>
						<span>하체 루틴</span>
					</Link>
					<Link
						href="/"
						className="flex flex-col items-center justify-center w-full text-3xl bg-accent"
					>
						<span>오늘의 추천 </span>
						<span>전신 루틴</span>
					</Link>
				</Carousel.Item>
				<Carousel.Item id="hot-routine" className="flex w-full text-white">
					<Link
						href="/"
						className="flex flex-col items-center justify-center w-full text-3xl bg-primary"
					>
						<span>인기 있는</span>
						<span>상체 루틴</span>
					</Link>
					<Link
						href="/"
						className="flex flex-col items-center justify-center w-full text-3xl bg-secondary"
					>
						<span>인기 있는</span>
						<span>하체 루틴</span>
					</Link>
					<Link
						href="/"
						className="flex flex-col items-center justify-center w-full text-3xl bg-accent"
					>
						<span>인기 있는</span>
						<span>전신 루틴</span>
					</Link>
				</Carousel.Item>
			</Carousel>
		</div>
	);
}
