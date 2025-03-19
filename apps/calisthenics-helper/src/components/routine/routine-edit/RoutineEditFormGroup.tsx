import { ReactNode } from 'react';

type Props = {
	displayName: string;
	error?: string;
	children: ReactNode;
	htmlFor?: string;
};

export default function RoutineEditFormGroup({
	displayName,
	error,
	children,
	htmlFor,
}: Props) {
	return (
		<>
			<div className="flex flex-col gap-2 px-4">
				<label className="flex-1 font-bold shrink-0" htmlFor={htmlFor}>
					{displayName}
				</label>
				{children}
				<p className="text-error">{error}</p>
			</div>
			<div className="mt-1 divider"></div>
		</>
	);
}
