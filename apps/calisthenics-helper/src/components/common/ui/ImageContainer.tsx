import { ReactNode } from 'react';
import Image from 'next/image';

type Props = {
	image: string | null;
	alt: string;
	sizes: string;
	className: string;
	fallbackContent: ReactNode;
};

export default function ImageContainer({
	image,
	alt,
	sizes,
	className,
	fallbackContent,
}: Props) {
	return (
		<div
			className={[
				'flex items-center justify-center relative',
				className,
				image ? '' : 'bg-black text-white',
			].join(' ')}
		>
			{image ? (
				<Image
					src={image}
					alt={alt}
					className="absolute"
					sizes={sizes}
					fill={true}
				/>
			) : (
				fallbackContent
			)}
		</div>
	);
}
