import {
	DetailedHTMLProps,
	DragEvent,
	HTMLAttributes,
	useRef,
	useState,
} from 'react';

export default function DragContainer({
	children,
	className,
	onDrop,
	onDragStart,
	...props
}: DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>) {
	const [isDragEnter, setIsDragEnter] = useState<boolean>(false);
	const dragStart = useRef<boolean>(false);

	const handleDragStart = (e: DragEvent<HTMLDivElement>) => {
		dragStart.current = true;
		if (onDragStart) {
			onDragStart(e);
		}
	};

	const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
		e.preventDefault();
	};

	const handleDragEnd = (e: DragEvent<HTMLDivElement>) => {
		dragStart.current = false;
	};

	const handleDragEnter = (e: DragEvent<HTMLDivElement>) => {
		if (dragStart.current) {
			return;
		}

		setIsDragEnter(true);
	};

	const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
		if (e.currentTarget.contains(e.relatedTarget as HTMLElement)) {
			return;
		}

		setIsDragEnter(false);
	};

	const handleDrop = (e: DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		setIsDragEnter(false);

		if (!dragStart.current && onDrop) {
			onDrop(e);
		}
	};

	return (
		<div
			{...props}
			className={[
				`${isDragEnter ? 'bg-info text-info-content' : ''}`,
				className,
			].join(' ')}
			draggable
			onDragStart={handleDragStart}
			onDragOver={handleDragOver}
			onDragEnd={handleDragEnd}
			onDrop={handleDrop}
			onDragEnter={handleDragEnter}
			onDragLeave={handleDragLeave}
		>
			{children}
		</div>
	);
}
