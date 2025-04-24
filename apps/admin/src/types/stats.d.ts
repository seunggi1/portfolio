export type AdminSignIn = {
	id: string;
	password: string;
};

export type StatsRequest = {
	startDate: string;
	endDate: string;
};

export type Stats = {
	date: string;
	routineCount: number;
	userCount: number;
};

export type TotalStats = {
	totalUserCount: number;
	totalRoutineCount: number;
};

export type StatsResult = {
	stats: Stats[];
	totalStats: TotalStats;
};
