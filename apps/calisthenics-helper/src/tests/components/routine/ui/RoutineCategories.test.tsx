import { RoutineCategories } from '@/components/common/ui';
import { render, screen } from '@testing-library/react';
import { beforeAll, describe, expect, it } from 'vitest';

describe('Categories Names Tests', () => {
	const mockCategories = ['상체', '하체', '등', '전신'];

	beforeAll(() => {
		render(<RoutineCategories categoryNames={mockCategories} />);
	});

	it('renders a div with flex in className', () => {
		const div = document.querySelector('div.flex');
		expect(div).not.toBeNull();
	});

	it('renders all categories ', () => {
		for (const name of mockCategories) {
			const item = screen.getByText(name);
			expect(item).toBeDefined();
		}
	});
});
