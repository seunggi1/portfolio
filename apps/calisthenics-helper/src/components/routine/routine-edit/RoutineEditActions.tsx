import { ReactElement } from 'react';
import { Button } from '@repo/ui/common';

type Props = {
	onPrevClick: () => void;
	nextButton: ReactElement<HTMLButtonElement>;
	hasPrevButton: boolean;
};

export default function RoutineEditActions({
	onPrevClick,
	nextButton,
	hasPrevButton,
}: Props) {
	return (
		<div className="flex justify-between gap-2 px-4 my-4">
			{hasPrevButton && (
				<div className="flex-1">
					<Button color="secondary" className="w-full" onClick={onPrevClick}>
						이전
					</Button>
				</div>
			)}
			<div className="flex-1">{nextButton}</div>
		</div>
	);
}
