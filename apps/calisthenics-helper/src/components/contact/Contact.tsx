'use client';

import { useActionState } from 'react';
import { Button, Input, TextArea } from '@repo/ui/common';
import FormGroup from '../common/ui/FormGroup';
import { nameofFactory } from '@/utils/type';
import { ContactResponse } from '@/types/contact';
import { createContactAction } from '@/actions/contact';
import Loading from '../common/ui/Loading';

export default function Contact() {
	const [{ success, errors, inputs }, formAction, isPending] = useActionState<
		ContactResponse,
		FormData
	>(createContactAction, {
		success: false,
		inputs: {},
		errors: {},
	});

	const nameof = nameofFactory<ContactResponse['inputs']>();

	return (
		<section className="w-full h-full bg-gray-100">
			<div className="flex items-center h-full">
				<form
					action={formAction}
					className="w-full p-4 mx-auto text-center bg-white md:!w-3/4"
				>
					<h2 className="mb-4 text-3xl font-bold text-center">문의 하기</h2>
					<FormGroup
						displayName="제목"
						htmlFor={nameof('title')}
						error={errors.title}
					>
						<Input
							id={nameof('title')}
							name={nameof('title')}
							defaultValue={inputs.title}
							minLength={2}
							required
						/>
					</FormGroup>
					<FormGroup
						displayName="내용"
						htmlFor={nameof('contents')}
						error={errors.contents}
					>
						<TextArea
							id={nameof('contents')}
							defaultValue={inputs.contents}
							name={nameof('contents')}
							minLength={5}
							required
						/>
					</FormGroup>
					<FormGroup displayName="" addDivider={false}>
						<Button
							color="primary"
							type="submit"
							disabled={isPending || success}
						>
							{isPending ? <Loading /> : '문의 전송'}
						</Button>
						{success && (
							<span className="text-success">성공적으로 전송되었습니다.</span>
						)}
					</FormGroup>
				</form>
			</div>
		</section>
	);
}
