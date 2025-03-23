import Input from '@/components/common/ui/Input';

export default function SearchInput() {
	return (
		<Input
			id="search"
			placeholder="루틴 검색"
			className="border !border-secondary focus:!outline-primary !h-10"
		/>
	);
}
