import { useActionState, useEffect } from 'react';
import { updateDisplayNameAction } from '@/actions';
import { UpdateDisplayNameResponse, User } from '@/types/auth';
import { Button, Input } from '@repo/ui/common';
import { FormGroup, Loading } from '@/components/common/ui';

type Props = {
	displayName?: User['displayName'];
	onSubmit: () => void;
};

export default function DisplayNameForm({ displayName, onSubmit }: Props) {
	const [{ success, errors, inputs }, formAction, isPending] = useActionState<
		UpdateDisplayNameResponse,
		FormData
	>(updateDisplayNameAction, {
		success: false,
		errors: {},
		inputs: {
			displayName,
		},
	});

	useEffect(() => {
		let timer: number | undefined;
		if (success) {
			timer = window.setTimeout(onSubmit, 1200);
		}
		return () => window.clearTimeout(timer);
	}, [success, onSubmit]);

	return (
		<form action={formAction}>
			<FormGroup displayName="별명" error={errors.displayName}>
				<Input
					name="displayName"
					type="text"
					min={3}
					max={8}
					required
					defaultValue={inputs.displayName}
				/>
				<Button
					color="primary"
					size="sm"
					disabled={isPending || success}
					type="submit"
				>
					{isPending || success ? <Loading /> : '변경'}
				</Button>
				{success && (
					<span className="text-success">변경이 완료되었습니다.</span>
				)}
			</FormGroup>
		</form>
	);
}
