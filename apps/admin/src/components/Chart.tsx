import {
	CartesianGrid,
	Legend,
	Line,
	LineChart,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from 'recharts';
import Container from './Container';

type Props = {
	data: { date: string; count: number }[];
	chartName: string;
	label: string;
};

export default function Chart({ data, chartName, label }: Props) {
	return (
		<Container className="h-full">
			<div className="p-4">
				<h2 className="text-lg text-gray-600">{chartName}</h2>
				<span className="text-sm text-gray-400">
					{'2025-01-01'} - {'2025-01-01'}
				</span>
			</div>
			<ResponsiveContainer width="100%" height={500}>
				<LineChart
					width={500}
					height={300}
					data={data}
					margin={{
						top: 20,
						right: 30,
						left: 20,
						bottom: 10,
					}}
				>
					<CartesianGrid strokeDasharray="3 3" />
					<XAxis
						dataKey="date"
						height={100}
						tick={(props) => <CustomizedAxisTick {...props} />}
					/>
					<YAxis />
					<Tooltip />
					<Legend />
					<Line
						type="monotone"
						dataKey="count"
						stroke="#4D6EFF"
						name={label}
						label={(props) => <CustomizedLabel {...props} />}
					/>
				</LineChart>
			</ResponsiveContainer>
		</Container>
	);
}

function CustomizedLabel({
	x,
	y,
	stroke,
	value,
}: {
	x: number;
	y: number;
	stroke: string;
	value: any;
}) {
	return (
		<text x={x} y={y} dy={-4} fill={stroke} fontSize={14} textAnchor="middle">
			{value}
		</text>
	);
}

function CustomizedAxisTick({
	x,
	y,
	payload,
}: {
	x: number;
	y: number;
	payload: any;
}) {
	return (
		<g transform={`translate(${x},${y})`}>
			<text
				x={0}
				y={0}
				dy={16}
				textAnchor="end"
				fill="#666"
				transform="rotate(-35)"
			>
				{payload.value}
			</text>
		</g>
	);
}
