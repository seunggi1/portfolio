import { ChangeEvent, FormEvent, MouseEvent } from 'react';
import FormInput from '@/components/common/input/FormInput';
import {
	NewRoutineBase,
	RoutineBaseFormData,
	RoutineCategory,
} from '@/types/routine';
import { nameofFactory } from '@/utils/type';
import { Button } from '@repo/ui/common';

type Props = {
	formData: RoutineBaseFormData;
	routineCategories: RoutineCategory[];
	onDataChange: (name: keyof NewRoutineBase, value: string) => void;
	onRoutineCategoryClick: (id: RoutineCategory['id']) => void;
	onSubmit: () => void;
};

export default function RoutineBaseForm({
	formData: { inputs: data, errors },
	routineCategories,
	onDataChange,
	onSubmit,
	onRoutineCategoryClick,
}: Props) {
	const categories = new Set(data?.categoryIDs);
	const nameof = nameofFactory<NewRoutineBase>();

	const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		const inputElem = e.target;

		const name = inputElem.name as keyof NewRoutineBase;
		onDataChange(name, inputElem.value);
	};

	const onRoutineCategoriesClick = (e: MouseEvent<HTMLUListElement>) => {
		const target = e.target;

		if (target instanceof HTMLLIElement) {
			if (target.dataset['id']) {
				onRoutineCategoryClick(target.dataset['id']);
			}
		}
	};

	return (
		<section className="flex flex-col items-center justify-center w-full h-full gap-4">
			<h2 className="text-2xl font-bold">루틴 기본 정보</h2>
			<form
				className="w-3/4 space-y-8"
				onSubmit={(e: FormEvent<HTMLFormElement>) => {
					e.preventDefault();
					onSubmit();
				}}
			>
				<FormInput
					name={nameof('name')}
					displayName="루틴 이름"
					value={data?.name ?? ''}
					type="text"
					min={3}
					max={15}
					error={errors?.name}
					onChange={onInputChange}
					required
				/>
				<FormInput
					name={nameof('difficultyLevel')}
					displayName="루틴 난이도"
					value={data?.difficultyLevel ?? ''}
					type="number"
					min={1}
					max={5}
					error={errors?.difficultyLevel}
					onChange={onInputChange}
					required
				/>
				<FormInput
					name={nameof('restSeconds')}
					displayName="휴식 시간(초)"
					type="number"
					value={data?.restSeconds ?? ''}
					error={errors?.restSeconds}
					onChange={onInputChange}
					required
				/>
				<FormInput
					name={nameof('totalSets')}
					displayName="세트 수"
					value={data?.totalSets ?? ''}
					type="number"
					min={1}
					error={errors?.totalSets}
					onChange={onInputChange}
					required
				/>
				<ul className="flex gap-4" onClick={onRoutineCategoriesClick}>
					{routineCategories.map(({ id, name }) => (
						<li
							className={[
								'cursor-pointer p-2 rounded-sm text-white select-none',
								categories.has(id) ? 'bg-primary ' : 'bg-secondary',
							].join(' ')}
							key={id}
							data-id={id}
						>
							{name}
						</li>
					))}
				</ul>
				<span className="text-error">{errors?.categoryIDs}</span>
				<div className="mt-4 text-right">
					<Button type="submit">루틴 저장</Button>
				</div>
			</form>
		</section>
	);
}
