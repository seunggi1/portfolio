import { Button } from '@repo/ui/common';

export default function Error() {
	return (
		<div className="flex flex-col items-center justify-center h-full gap-2">
			<p className="text-xl">⚠️ 에러가 발생했습니다.</p>
			<p className="text-xl">잠시 후 다시 시도해주세요.</p>
			<Button onClick={() => window.location.reload()}>돌아가기</Button>
		</div>
	);
}
