'use client';

import { useState } from 'react';
import { Button } from '@repo/ui/common';
import Profile from './Profile';
import MyRoutine from './MyRoutine';

export default function ProfileContainer() {
	const [isProfile, setIsProfile] = useState<boolean>(true);

	return (
		<section className="w-full h-full pt-10 bg-gray-100">
			<div className="w-3/4 mx-auto">
				<div className="mb-[0.5px] bg-white rounded-tl-lg rounded-tr-lg w-fit">
					<ul className="flex gap-[0.5px]">
						<li>
							<Button
								color={isProfile ? 'primary' : 'ghost'}
								onClick={() => setIsProfile(true)}
							>
								내 정보
							</Button>
						</li>
						<li>
							<Button
								color={!isProfile ? 'primary' : 'ghost'}
								onClick={() => setIsProfile(false)}
							>
								내 루틴
							</Button>
						</li>
					</ul>
				</div>
				{isProfile && <Profile />}
				{!isProfile && <MyRoutine />}
			</div>
		</section>
	);
}
