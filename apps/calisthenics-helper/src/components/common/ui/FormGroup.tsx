import { ReactNode } from 'react';

type Props = {
	displayName: string;
	error?: string;
	children: ReactNode;
	htmlFor?: string;
	addDivider?: boolean;
};

export default function FormGroup({
	displayName,
	error,
	children,
	htmlFor,
	addDivider = true,
}: Props) {
	return (
		<>
			<div className="flex flex-col px-4 gap-2">
				<label className="flex-1 font-bold shrink-0" htmlFor={htmlFor}>
					{displayName}
				</label>
				{children}
				<p className="text-error">{error}</p>
			</div>
			{addDivider ? <div className="mt-1 divider"></div> : null}
		</>
	);
}
