import {
	Children,
	FC,
	isValidElement,
	ReactElement,
	ReactNode,
	useMemo,
} from 'react';

type CarouselProps = {
	className?: string;
	children: ReactNode;
};

type CarouselItemProps = CarouselProps & {
	id: string;
};

type CarouselComponent = FC<CarouselProps> & {
	Item: CarouselItemComponent;
};

type CarouselItemComponent = FC<CarouselItemProps>;

const CarouselItem: CarouselItemComponent = ({
	className,
	children,
	id,
}: CarouselItemProps) => {
	return (
		<div id={id} className={['carousel-item', className ?? ''].join(' ')}>
			{children}
		</div>
	);
};

const Carousel: CarouselComponent = ({
	className,
	children,
}: CarouselProps) => {
	const carouselItemIDs: string[] = useMemo(
		() =>
			Children.toArray(children).reduce<string[]>(
				(arr, child) =>
					isValidElement(child) && child.type === CarouselItem
						? [...arr, (child as ReactElement<CarouselItemProps>).props.id]
						: arr,
				[]
			),
		[children]
	);

	return (
		<div className="relative w-full h-full">
			<div
				className={['carousel rounded-box', className ? className : ''].join(
					' '
				)}
			>
				{children}
				<div className="absolute z-10 flex justify-center w-full gap-4 -translate-x-1/2 left-1/2 bottom-5">
					{carouselItemIDs.map((id, i) => (
						<button
							key={id}
							className="p-2 bg-gray-100 opacity-40 w-[35px] rounded-md text-center font-bold"
							onClick={(e) => {
								e.preventDefault();
								const item = document.getElementById(id);
								item?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
							}}
						>
							{i + 1}
						</button>
					))}
				</div>
			</div>
		</div>
	);
};

Carousel.Item = CarouselItem;

export default Carousel;
