import { render, screen } from '@testing-library/react';
import { beforeAll, describe, expect, it } from 'vitest';
import RoutineSummary from '@/components/common/ui/RoutineSummary';
import { Routine } from '@/types/routine';

describe('Routine Summary Tests', () => {
	const {
		name,
		totalExerciseCount,
		totalMinutes,
		restSeconds,
		totalSets,
	}: Pick<
		Routine,
		'name' | 'totalMinutes' | 'totalExerciseCount' | 'restSeconds' | 'totalSets'
	> = {
		name: '전신운동',
		totalExerciseCount: 12,
		totalMinutes: 60,
		restSeconds: 60,
		totalSets: 3,
	};

	beforeAll(() => {
		render(
			<RoutineSummary
				name={name}
				totalExerciseCount={totalExerciseCount}
				totalMinutes={totalMinutes}
				restSeconds={restSeconds}
				totalSets={totalSets}
			/>
		);
	});

	it('renders 2 paragraphs', () => {
		const paragraphs = screen.getAllByRole('paragraph');

		expect(paragraphs.length).toEqual(2);
	});

	it('renders all props text', () => {
		const paragraphs = screen.getAllByRole('paragraph');

		const hasTitle = paragraphs[0].textContent?.includes(name);
		const hasSummary =
			paragraphs[1].textContent?.includes(totalMinutes.toString()) &&
			paragraphs[1].textContent?.includes(totalExerciseCount.toString());

		expect(hasTitle && hasSummary).toBeTruthy();
	});
});
