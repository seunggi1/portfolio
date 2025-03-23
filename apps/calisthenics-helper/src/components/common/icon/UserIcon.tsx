import { User } from 'lucide-react';

type Props = {
	className?: string;
};

export default function UserIcon({ className }: Props) {
	return <User className={className} />;
}
