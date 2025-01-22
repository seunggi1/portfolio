import './globals.css';
import '@repo/ui/styles.css';
import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { Karla } from 'next/font/google';
import Layout from '@/components/layout/Layout';

const karla = Karla({
	subsets: ['latin'],
});

export const metadata: Metadata = {
	title: '맨몸운동헬퍼',
	description: '맨몸운동을 시작하기위한 페이지',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: ReactNode;
}>) {
	return (
		<html lang="kr">
			<body className={`${karla} antialiased`}>
				<Layout>{children}</Layout>
			</body>
		</html>
	);
}
