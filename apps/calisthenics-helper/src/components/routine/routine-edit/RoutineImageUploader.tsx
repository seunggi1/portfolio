import { ChangeEvent, useEffect, useRef, useState } from 'react';
import Input from '@/components/common/ui/Input';
import Image from 'next/image';
import { NewRoutine } from '@/types/routine';
import PreviewImage from '@/components/common/ui/PreviewImage';
import { Button } from '@repo/ui/common';

type Props = {
	value: NewRoutine['image'];
	onChange: (file: NewRoutine['image']) => void;
};

export default function RoutineImageUploader({ value, onChange }: Props) {
	const imageInputRef = useRef<HTMLInputElement>(null);
	const handleImageFileChange = (e: ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files.length > 0) {
			onChange(e.target.files.item(0));
		}
	};

	const handleImageFileReset = () => {
		onChange(null);
		if (imageInputRef.current) {
			imageInputRef.current.value = '';
		}
	};

	return (
		<div>
			{value && <PreviewImage image={value} />}
			<Input
				id="image"
				type="file"
				className="file-input file-input-info w-full max-w-xs border-none pl-0"
				accept="image/jpeg, image/jpg, image/png"
				onChange={handleImageFileChange}
				ref={imageInputRef}
			/>
			<p className="text-secondary text-sm my-2 text-pretty">
				이미지 파일은 .jpg, .jpeg, .png 형식과 파일 크기 250KB이하만 업로드
				가능합니다.
			</p>
			<Button color="error" size="sm" onClick={handleImageFileReset}>
				초기화
			</Button>
		</div>
	);
}
