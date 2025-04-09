import { ChangeEvent, useRef } from 'react';
import { NewRoutine } from '@/types/routine';
import PreviewImage from '@/components/common/ui/PreviewImage';
import { Button, Input } from '@repo/ui/common';

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
				className="w-full max-w-xs pl-0 border-none file-input file-input-info"
				accept="image/jpeg, image/jpg, image/png"
				onChange={handleImageFileChange}
				ref={imageInputRef}
			/>
			<p className="my-2 text-sm text-secondary text-pretty">
				이미지 파일은 .jpg, .jpeg, .png 형식과 파일 크기 250KB이하만 업로드
				가능합니다.
			</p>
			<Button color="error" size="sm" onClick={handleImageFileReset}>
				초기화
			</Button>
		</div>
	);
}
