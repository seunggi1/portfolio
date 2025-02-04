export type Json =
	| string
	| number
	| boolean
	| null
	| { [key: string]: Json | undefined }
	| Json[];

export type Database = {
	public: {
		Tables: {
			Categories: {
				Row: {
					created_at: string;
					id: string;
					name: string;
					updated_at: string;
				};
				Insert: {
					created_at?: string;
					id?: string;
					name: string;
					updated_at?: string;
				};
				Update: {
					created_at?: string;
					id?: string;
					name?: string;
					updated_at?: string;
				};
				Relationships: [];
			};
			Exercise_Categories: {
				Row: {
					category_id: string;
					created_at: string;
					exercise_id: string;
					id: string;
					updated_at: string;
				};
				Insert: {
					category_id: string;
					created_at?: string;
					exercise_id: string;
					id?: string;
					updated_at?: string;
				};
				Update: {
					category_id?: string;
					created_at?: string;
					exercise_id?: string;
					id?: string;
					updated_at?: string;
				};
				Relationships: [
					{
						foreignKeyName: 'Exercise_Categories_category_id_fkey';
						columns: ['category_id'];
						isOneToOne: false;
						referencedRelation: 'Categories';
						referencedColumns: ['id'];
					},
					{
						foreignKeyName: 'Exercise_Categories_exercise_id_fkey';
						columns: ['exercise_id'];
						isOneToOne: false;
						referencedRelation: 'Exercises';
						referencedColumns: ['id'];
					},
				];
			};
			Exercises: {
				Row: {
					created_at: string;
					id: string;
					name: string | null;
					updated_at: string;
				};
				Insert: {
					created_at?: string;
					id?: string;
					name?: string | null;
					updated_at?: string;
				};
				Update: {
					created_at?: string;
					id?: string;
					name?: string | null;
					updated_at?: string;
				};
				Relationships: [];
			};
			ExerciseSets: {
				Row: {
					created_at: string;
					exercise_id: string;
					id: string;
					name: string;
					repetition_count: number;
					sets: number;
					timer_id: string;
					updated_at: string;
				};
				Insert: {
					created_at?: string;
					exercise_id: string;
					id?: string;
					name: string;
					repetition_count: number;
					sets?: number;
					timer_id: string;
					updated_at?: string;
				};
				Update: {
					created_at?: string;
					exercise_id?: string;
					id?: string;
					name?: string;
					repetition_count?: number;
					sets?: number;
					timer_id?: string;
					updated_at?: string;
				};
				Relationships: [
					{
						foreignKeyName: 'ExerciseSets_excercise_id_fkey';
						columns: ['exercise_id'];
						isOneToOne: false;
						referencedRelation: 'Exercises';
						referencedColumns: ['id'];
					},
					{
						foreignKeyName: 'ExerciseSets_exercise_id_fkey';
						columns: ['exercise_id'];
						isOneToOne: false;
						referencedRelation: 'Exercises';
						referencedColumns: ['id'];
					},
					{
						foreignKeyName: 'ExerciseSets_timer_id_fkey';
						columns: ['timer_id'];
						isOneToOne: false;
						referencedRelation: 'Timers';
						referencedColumns: ['id'];
					},
				];
			};
			Routine_ExerciseSets: {
				Row: {
					created_at: string;
					exercise_order: number;
					exercise_set_id: string;
					id: string;
					routine_id: string;
					updated_at: string;
				};
				Insert: {
					created_at?: string;
					exercise_order: number;
					exercise_set_id: string;
					id?: string;
					routine_id: string;
					updated_at?: string;
				};
				Update: {
					created_at?: string;
					exercise_order?: number;
					exercise_set_id?: string;
					id?: string;
					routine_id?: string;
					updated_at?: string;
				};
				Relationships: [
					{
						foreignKeyName: 'Routine_ExerciseSets_exercise_set_id_fkey';
						columns: ['exercise_set_id'];
						isOneToOne: false;
						referencedRelation: 'ExerciseSets';
						referencedColumns: ['id'];
					},
					{
						foreignKeyName: 'Routine_ExerciseSets_routine_id_fkey';
						columns: ['routine_id'];
						isOneToOne: false;
						referencedRelation: 'Routines';
						referencedColumns: ['id'];
					},
				];
			};
			Routines: {
				Row: {
					created_at: string;
					description: string | null;
					difficulty_level: number;
					id: string;
					image_url: string | null;
					name: string;
					updated_at: string;
				};
				Insert: {
					created_at?: string;
					description?: string | null;
					difficulty_level: number;
					id?: string;
					image_url?: string | null;
					name: string;
					updated_at?: string;
				};
				Update: {
					created_at?: string;
					description?: string | null;
					difficulty_level?: number;
					id?: string;
					image_url?: string | null;
					name?: string;
					updated_at?: string;
				};
				Relationships: [];
			};
			Timers: {
				Row: {
					created_at: string;
					id: string;
					name: string;
					rest_time: number;
					total_time: number;
					updated_at: string;
				};
				Insert: {
					created_at?: string;
					id?: string;
					name: string;
					rest_time: number;
					total_time: number;
					updated_at?: string;
				};
				Update: {
					created_at?: string;
					id?: string;
					name?: string;
					rest_time?: number;
					total_time?: number;
					updated_at?: string;
				};
				Relationships: [];
			};
			User: {
				Row: {
					created_at: string;
					email: string | null;
					id: string;
					name: string;
					platform_id: string | null;
					updated_at: string | null;
				};
				Insert: {
					created_at?: string;
					email?: string | null;
					id?: string;
					name: string;
					platform_id?: string | null;
					updated_at?: string | null;
				};
				Update: {
					created_at?: string;
					email?: string | null;
					id?: string;
					name?: string;
					platform_id?: string | null;
					updated_at?: string | null;
				};
				Relationships: [];
			};
		};
		Views: {
			[_ in never]: never;
		};
		Functions: {
			exerciseSets: {
				Args: {
					routineID: string;
				};
				Returns: {
					id: string;
					name: string;
					sets: number;
					repetitionCount: number;
					totalTime: number;
					restTime: number;
				}[];
			};
			routine: {
				Args: {
					routineID: string;
				};
				Returns: {
					id: string;
					name: string;
					imageURL: string;
					difficultyLevel: number;
					categoryNames: string[];
					totalExerciseCount: number;
					totalMinutes: number;
				}[];
			};
			routines: {
				Args: {
					page: number;
				};
				Returns: {
					id: string;
					name: string;
					imageURL: string;
					difficultyLevel: number;
					categoryNames: string[];
					totalExerciseCount: number;
					totalMinutes: number;
				}[];
			};
		};
		Enums: {
			[_ in never]: never;
		};
		CompositeTypes: {
			[_ in never]: never;
		};
	};
};

type PublicSchema = Database[Extract<keyof Database, 'public'>];

export type Tables<
	PublicTableNameOrOptions extends
		| keyof (PublicSchema['Tables'] & PublicSchema['Views'])
		| { schema: keyof Database },
	TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
		? keyof (Database[PublicTableNameOrOptions['schema']]['Tables'] &
				Database[PublicTableNameOrOptions['schema']]['Views'])
		: never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
	? (Database[PublicTableNameOrOptions['schema']]['Tables'] &
			Database[PublicTableNameOrOptions['schema']]['Views'])[TableName] extends {
			Row: infer R;
		}
		? R
		: never
	: PublicTableNameOrOptions extends keyof (PublicSchema['Tables'] &
				PublicSchema['Views'])
		? (PublicSchema['Tables'] &
				PublicSchema['Views'])[PublicTableNameOrOptions] extends {
				Row: infer R;
			}
			? R
			: never
		: never;

export type TablesInsert<
	PublicTableNameOrOptions extends
		| keyof PublicSchema['Tables']
		| { schema: keyof Database },
	TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
		? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
		: never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
	? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
			Insert: infer I;
		}
		? I
		: never
	: PublicTableNameOrOptions extends keyof PublicSchema['Tables']
		? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
				Insert: infer I;
			}
			? I
			: never
		: never;

export type TablesUpdate<
	PublicTableNameOrOptions extends
		| keyof PublicSchema['Tables']
		| { schema: keyof Database },
	TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
		? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
		: never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
	? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
			Update: infer U;
		}
		? U
		: never
	: PublicTableNameOrOptions extends keyof PublicSchema['Tables']
		? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
				Update: infer U;
			}
			? U
			: never
		: never;

export type Enums<
	PublicEnumNameOrOptions extends
		| keyof PublicSchema['Enums']
		| { schema: keyof Database },
	EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
		? keyof Database[PublicEnumNameOrOptions['schema']]['Enums']
		: never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
	? Database[PublicEnumNameOrOptions['schema']]['Enums'][EnumName]
	: PublicEnumNameOrOptions extends keyof PublicSchema['Enums']
		? PublicSchema['Enums'][PublicEnumNameOrOptions]
		: never;

export type CompositeTypes<
	PublicCompositeTypeNameOrOptions extends
		| keyof PublicSchema['CompositeTypes']
		| { schema: keyof Database },
	CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
		schema: keyof Database;
	}
		? keyof Database[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes']
		: never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
	? Database[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes'][CompositeTypeName]
	: PublicCompositeTypeNameOrOptions extends keyof PublicSchema['CompositeTypes']
		? PublicSchema['CompositeTypes'][PublicCompositeTypeNameOrOptions]
		: never;
