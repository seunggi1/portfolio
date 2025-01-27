import { expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import Header from '@/components/layout/header';

test('Header', () => {
	render(<Header />);

	const logo = screen.getByText('맨몸운동헬퍼');
	const loginButton = screen.getByRole('button', { name: '로그인' });
	expect(logo).toBeDefined();
	expect(loginButton).toBeDefined();
});
