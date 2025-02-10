import { Progress } from '@repo/ui/common';

type Props = {
	seconds: number;
	maxSeconds: number;
};

export default function Timer({ seconds, maxSeconds }: Props) {
	return (
		<Progress value={(seconds / maxSeconds) * 100} size="md" thickness="xl">
			{parseInt(Math.ceil(seconds).toString())}
		</Progress>
	);
}
