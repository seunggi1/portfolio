import { Button } from '@repo/ui/common';
import { PlayCircle } from 'lucide-react';

type Props = {
	onPrepare: () => void;
};

export default function RoutinePrepare({ onPrepare }: Props) {
	return (
		<div className="flex flex-col items-center justify-center w-full h-full gap-4 text-8xl font-bold">
			<Button onClick={onPrepare}>루틴 시작 하기</Button>
		</div>
	);
}
