import './globals.css';
import '@repo/ui/styles.css';
import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import Layout from '@/components/layout/Layout';
import { roboto } from '@/styles/fonts';

export const metadata: Metadata = {
	title: {
		default: '맨몸운동헬퍼',
		template: `%s | 맨몸운동헬퍼`,
	},
	description: '맨몸운동을 시작하고싶은 모든 사람들을 위한 장소',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: ReactNode;
}>) {
	return (
		<html
			lang="kr"
			className={`${roboto.className} antialiased`}
			data-theme="corporate"
		>
			<Layout>{children}</Layout>
		</html>
	);
}
