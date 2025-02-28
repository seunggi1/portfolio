import { Button } from '@repo/ui/common';

type Props = {
	onPrepareClick: () => void;
};

export default function RoutinePrepare({ onPrepareClick }: Props) {
	return (
		<div className="flex flex-col items-center justify-center w-full h-full gap-4 text-8xl font-bold">
			<Button onClick={onPrepareClick}>루틴 시작 하기</Button>
		</div>
	);
}
