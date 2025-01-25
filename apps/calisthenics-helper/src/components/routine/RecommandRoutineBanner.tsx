import Link from 'next/link';

export default function RecommandRoutineBanner() {
	return (
		<div className="max-w-screen-xl m-auto h-[20rem] bg-black text-white">
			<Link
				href="/"
				className="flex flex-col items-center justify-center h-full text-3xl"
			>
				<span>고민 하는 당신을 위한</span>
				<span>오늘의 추천 루틴</span>
			</Link>
		</div>
	);
}
