import { usePreviewImage } from '@/hooks';
import Image from 'next/image';

type Props = {
	image: File | string;
};

export default function PreviewImage({ image }: Props) {
	const previewURL = usePreviewImage(image);

	return (
		<div className="border-2 border-primary mb-4 overflow-hidden w-fit rounded-md">
			{previewURL ? (
				<Image src={previewURL} alt="preview image" width={150} height={150} />
			) : null}
		</div>
	);
}
