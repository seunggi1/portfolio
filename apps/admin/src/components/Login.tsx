import { FormEvent, useState, useTransition } from 'react';
import { login } from '@/api/stats';
import { Button, Input, Loading } from '@repo/ui/common';

type Props = {
	onSuccess: () => void;
};

export default function Login({ onSuccess }: Props) {
	const [isPending, startTransition] = useTransition();
	const [error, setError] = useState<string>('');

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		startTransition(async () => {
			e.preventDefault();

			const formData = new FormData(e.target as HTMLFormElement);

			const result = await login({
				id: formData.get('id') as string,
				password: formData.get('password') as string,
			});

			if (result) {
				onSuccess();
			} else {
				setError('인증 정보가 올바르지 않습니다.');
			}
		});
	};

	return (
		<section className="flex items-center justify-center w-full h-full bg-gray-100">
			<form
				className="flex flex-col justify-center w-full gap-2 px-4 py-2 bg-white rounded-md md:!w-1/2"
				onSubmit={handleSubmit}
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
				<Button disabled={isPending} type="submit">
					{isPending ? <Loading /> : '로그인'}
				</Button>
			</form>
		</section>
	);
}
