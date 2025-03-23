import { SearchIcon as Search } from 'lucide-react';

type Props = {
	className?: string;
};

export default function SearchIcon({ className }: Props) {
	return <Search className={className} />;
}
