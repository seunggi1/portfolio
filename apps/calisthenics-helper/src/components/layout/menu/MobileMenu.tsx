import Link from 'next/link';
import { HomeIcon, MailIcon, UserIcon } from '@/components/common/icon';

export default function MobileMenu() {
	return (
		<nav className="fixed bottom-0 w-full h-[66px] z-50 lg:hidden">
			<ul className="flex justify-around w-full p-0 bg-stone-100 menu menu-horizontal rounded-box">
				<li>
					<Link className="flex flex-col" href={'/profile'}>
						<UserIcon />
						<span>내 정보</span>
					</Link>
				</li>
				<li className="items-center">
					<Link className="flex flex-col" href={'/'}>
						<HomeIcon />
						<span>홈</span>
					</Link>
				</li>
				<li className="items-center">
					<Link className="flex flex-col" href={'/contact'}>
						<MailIcon />
						<span>문의</span>
					</Link>
				</li>
			</ul>
		</nav>
	);
}
