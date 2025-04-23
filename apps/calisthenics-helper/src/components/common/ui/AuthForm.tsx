import { DetailedHTMLProps, FormHTMLAttributes } from 'react';

type Props = DetailedHTMLProps<
	FormHTMLAttributes<HTMLFormElement>,
	HTMLFormElement
>;

export default function AuthForm({ children, ...props }: Props) {
	return (
		<section className="flex items-center justify-center w-full h-full bg-gray-100">
			<form
				className="flex flex-col justify-center w-full gap-2 px-4 py-2 bg-white rounded-md md:!w-1/2"
				{...props}
			>
				{children}
			</form>
		</section>
	);
}
