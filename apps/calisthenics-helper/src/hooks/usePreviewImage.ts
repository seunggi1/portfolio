'use client';

import { useEffect, useState } from 'react';

export default function usePreviewImage(image: File | string) {
	const [previewURL, setPreviewURL] = useState<string | null>(
		typeof image === 'string' ? image : null
	);

	useEffect(() => {
		if (image instanceof File === false) {
			return;
		}
		const url = URL.createObjectURL(image);
		setPreviewURL(url);
		return () => URL.revokeObjectURL(url);
	}, [image]);

	return previewURL;
}
