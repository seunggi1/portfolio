import { RoutineLevel } from '@/components/common/ui';
import { render, screen } from '@testing-library/react';
import { beforeAll, describe, expect, it } from 'vitest';

describe('Routine Level Tests', () => {
	const mockLevel = 5;

	beforeAll(() => {
		render(<RoutineLevel level={mockLevel} />);
	});

	it('renders a ul with valid classNames', () => {
		const list = screen.getByRole('list');

		expect(list.classList.contains('flex')).toBeTruthy();
		expect(list.classList.contains('-space-x-[0.4rem]')).toBeTruthy();
	});

	it('renders a valid number of li and child', () => {
		const listItems = screen.getAllByRole('listitem');

		expect(listItems.length).toEqual(mockLevel);

		for (const listItem of listItems) {
			expect(listItem.children.length).toBeTruthy();
		}
	});
});
