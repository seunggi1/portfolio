import { login } from '@/api/stats';
import { Button, Input } from '@repo/ui/common';
import { useState } from 'react';

type Props = {
	onSuccess: () => void;
};

export default function Login({ onSuccess }: Props) {
	const [error, setError] = useState<string>('');

	return (
		<section className="flex items-center justify-center w-full h-full bg-gray-100">
			<form
				className="flex flex-col justify-center w-full gap-2 px-4 py-2 bg-white rounded-md md:!w-1/2"
				onSubmit={async (e) => {
					e.preventDefault();

					const formData = new FormData(e.target as HTMLFormElement);

					const result = await login({
						id: formData.get('id') as string,
						password: formData.get('password') as string,
					});

					if (result) {
						onSuccess();
					} else {
						setError('올바르지않은 인증 정보 입니다.');
					}
				}}
			>
				<h2 className="text-2xl font-bold text-center">로그인</h2>
				<label htmlFor="id">관리자 아이디</label>

				<Input
					name="id"
					type="text"
					id="id"
					required
					autoComplete="off"
					border={true}
				/>
				<label htmlFor="비밀번호">비밀번호</label>
				<Input
					name="password"
					type="password"
					id="password"
					autoComplete="off"
					required
				/>
				{error && <span className="text-error">{error}</span>}
				<Button type="submit">로그인</Button>
			</form>
		</section>
	);
}
