import { Metadata } from 'next';
import Contact from '@/components/contact/Contact';

export const metadata: Metadata = {
	title: '문의 하기',
};

export default function ContactPage() {
	return <Contact />;
}
