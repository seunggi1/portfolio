export type Color =
	| 'primary'
	| 'secondary'
	| 'info'
	| 'success'
	| 'warning'
	| 'error'
	| 'ghost';
export type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
export type BorderRadius = Size | 'full';
export type InputBase = {
	border?: boolean;
};
