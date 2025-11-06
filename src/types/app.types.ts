// Application-specific types

export interface NutritionInfo {
  calories: number;
  protein_g: number;
  carbs_g: number;
  fat_g: number;
  fiber_g?: number;
  sugar_g?: number;
}

export interface DetectedFood {
  name: string;
  quantity?: number;
  unit?: string;
  nutrition: NutritionInfo;
  confidence: number;
}

export interface AIAnalysisResult {
  foods: DetectedFood[];
  totalNutrition: NutritionInfo;
  confidence: number;
  processingTime: number;
  modelVersion?: string;
}

export interface CameraState {
  isReady: boolean;
  hasPermission: boolean;
  isProcessing: boolean;
  error?: string;
}

export interface ImageProcessingOptions {
  maxSize: number;
  quality: number;
  format: 'jpeg' | 'png';
}

export interface UploadProgress {
  loaded: number;
  total: number;
  percentage: number;
}

export type MealType = 'breakfast' | 'lunch' | 'dinner' | 'snack';
export type ProcessingStatus = 'pending' | 'processing' | 'completed' | 'failed';
export type Gender = 'male' | 'female' | 'other';
export type ActivityLevel = 'sedentary' | 'light' | 'moderate' | 'active' | 'very_active';
export type GoalType = 'lose_weight' | 'maintain' | 'gain_weight' | 'build_muscle';

export interface DailyProgress {
  date: string;
  consumed: NutritionInfo;
  goals: NutritionInfo;
  percentage: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
}

export interface MealWithFoods {
  meal: import('./database.types').Meal;
  foods: import('./database.types').FoodItem[];
}

export interface AuthState {
  user: import('./database.types').User | null;
  session: any | null;
  isLoading: boolean;
  error?: string;
}

export interface AppError {
  code: string;
  message: string;
  details?: any;
}

