'use client';

import { signIn } from '@/api/auth/auth';
import { Button } from '@repo/ui/common';
import { ChangeEvent, useState } from 'react';

export default function page() {
	const [email, setEmail] = useState<string>('');

	const handleClick = () => {
		if (!email) {
			return;
		}

		signIn(email);
	};

	return (
		<section className="flex items-center justify-center w-full h-full">
			<div className="flex flex-col justify-center h-48 gap-2 px-4 rounded-md bg-neutral-content w-80">
				<h2 className="text-3xl font-bold text-center">로그인</h2>
				<div>
					<label className="flex items-center gap-2 input input-bordered">
						이메일
						<input
							type="email"
							className="grow"
							placeholder="abcd1234@site.com"
							value={email}
							onChange={(e: ChangeEvent<HTMLInputElement>) => {
								setEmail(e.target.value);
							}}
						/>
					</label>
				</div>
				<Button onClick={handleClick}>로그인 링크 전송</Button>
			</div>
		</section>
	);
}
