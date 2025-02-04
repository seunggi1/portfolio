import { Routine, RoutineDetail } from '@/types/routine';
import { ServiceClient } from '../base/serviceClient';

export class MockServiceClient implements ServiceClient {
	private data: Routine[] = [
		{
			id: '8a3f94aa-ca1a-4bbb-86dd-20c67f7c7ca9',
			name: '초급자 하체루틴',
			imageURL: '/push-up.png',
			difficultyLevel: 1,
			categoryNames: ['다리'],
			totalExerciseCount: 3,
			totalMinutes: 13,
		},
		{
			id: 'dd6b8d8f-bcca-4d8f-9101-fece033a3bb5',
			name: '초급자 전신루틴',
			imageURL: '/push-up.png',
			difficultyLevel: 1,
			categoryNames: ['등', '가슴', '다리', '어깨', '전신'],
			totalExerciseCount: 5,
			totalMinutes: 21,
		},
		{
			id: '3b47b256-08cc-4ef5-b250-0fa981451df1',
			name: '초급자 상체루틴',
			imageURL: '/push-up.png',
			difficultyLevel: 2,
			categoryNames: ['등', '가슴', '어깨', '전신'],
			totalExerciseCount: 4,
			totalMinutes: 17,
		},
	];

	getRoutines(page: number = 1): Promise<Routine[]> {
		const MAX_ITEM = 20;
		return Promise.resolve(
			this.data.slice((0 + page - 1) * MAX_ITEM, MAX_ITEM * page)
		);
	}
	getRoutineById(id: string): Promise<RoutineDetail | null> {
		return Promise.resolve(null);
	}
}
