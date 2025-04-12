import { ReactNode } from 'react';
import { Button } from '@repo/ui/common';
import Link from 'next/link';

type Props = {
	path: 'profile' | 'routines';
	children: ReactNode;
};

export default function ProfileContainer({ path, children }: Props) {
	return (
		<section className="w-full h-full pt-10 bg-gray-100">
			<div className="w-3/4 mx-auto">
				<div className="mb-[0.5px] bg-white rounded-tl-lg rounded-tr-lg w-fit">
					<ul className="flex gap-[0.5px]">
						<li>
							<Link href={'/profile'}>
								<Button color={path === 'profile' ? 'primary' : 'ghost'}>
									내 정보
								</Button>
							</Link>
						</li>
						<li>
							<Link href={'/profile/routines'}>
								<Button color={path === 'routines' ? 'primary' : 'ghost'}>
									내 루틴
								</Button>
							</Link>
						</li>
					</ul>
				</div>
				{children}
			</div>
		</section>
	);
}
