// Database types matching Supabase schema

export interface User {
  id: string;
  email: string;
  full_name?: string;
  avatar_url?: string;
  created_at: string;
  updated_at: string;
}

export interface UserGoal {
  id: string;
  user_id: string;
  daily_calorie_goal?: number;
  daily_protein_goal_g?: number;
  daily_carbs_goal_g?: number;
  daily_fat_goal_g?: number;
  weight_kg?: number;
  height_cm?: number;
  age?: number;
  gender?: 'male' | 'female' | 'other';
  activity_level?: 'sedentary' | 'light' | 'moderate' | 'active' | 'very_active';
  goal_type?: 'lose_weight' | 'maintain' | 'gain_weight' | 'build_muscle';
  created_at: string;
  updated_at: string;
}

export interface Meal {
  id: string;
  user_id: string;
  created_at: string;
  updated_at: string;
  image_url: string;
  thumbnail_url?: string;
  total_calories?: number;
  total_protein_g?: number;
  total_carbs_g?: number;
  total_fat_g?: number;
  total_fiber_g?: number;
  total_sugar_g?: number;
  meal_type?: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  notes?: string;
  confidence_score?: number;
  processing_status: 'pending' | 'processing' | 'completed' | 'failed';
  processing_error?: string;
  ai_analysis?: any; // JSON field
  deleted_at?: string;
}

export interface FoodItem {
  id: string;
  meal_id: string;
  food_name: string;
  quantity?: number;
  unit?: string;
  calories?: number;
  protein_g?: number;
  carbs_g?: number;
  fat_g?: number;
  fiber_g?: number;
  sugar_g?: number;
  confidence_score?: number;
  nutrition_db_id?: string;
  created_at: string;
}

export interface NutritionDatabase {
  id: string;
  food_name: string;
  food_name_normalized: string;
  category?: string;
  serving_size?: string;
  serving_size_g?: number;
  calories_per_100g: number;
  protein_per_100g: number;
  carbs_per_100g: number;
  fat_per_100g: number;
  fiber_per_100g?: number;
  sugar_per_100g?: number;
  source: 'usda' | 'custom' | 'user';
  usda_fdc_id?: string;
  created_at: string;
  updated_at: string;
}

export interface DailySummary {
  id: string;
  user_id: string;
  date: string;
  total_calories: number;
  total_protein_g: number;
  total_carbs_g: number;
  total_fat_g: number;
  total_fiber_g: number;
  total_sugar_g: number;
  meal_count: number;
  created_at: string;
  updated_at: string;
}

export interface AnalysisLog {
  id: string;
  meal_id: string;
  user_id: string;
  created_at: string;
  processing_time_ms?: number;
  ai_model_version?: string;
  ai_provider: string;
  ai_request?: any; // JSON field
  ai_response?: any; // JSON field
  error_message?: string;
  status: 'success' | 'failed' | 'partial';
}

export interface AppAnalytics {
  id: string;
  user_id?: string;
  event_type: string;
  event_data?: any; // JSON field
  created_at: string;
  session_id?: string;
  device_info?: any; // JSON field
}

// Supabase Storage types
export interface StorageBucket {
  id: string;
  name: string;
  public: boolean;
  created_at: string;
  updated_at: string;
}

