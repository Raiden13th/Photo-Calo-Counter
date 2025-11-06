// Nutrition-related constants

export const MACROS = {
  PROTEIN_CALORIES_PER_GRAM: 4,
  CARBS_CALORIES_PER_GRAM: 4,
  FAT_CALORIES_PER_GRAM: 9,
};

export const DEFAULT_GOALS = {
  CALORIES: 2000,
  PROTEIN_G: 150,
  CARBS_G: 225,
  FAT_G: 65,
};

export const ACTIVITY_MULTIPLIERS = {
  sedentary: 1.2,
  light: 1.375,
  moderate: 1.55,
  active: 1.725,
  very_active: 1.9,
};

export const GOAL_ADJUSTMENTS = {
  lose_weight: -500, // -500 calories per day
  maintain: 0,
  gain_weight: 500, // +500 calories per day
  build_muscle: 300, // +300 calories per day
};

export const MACRO_RATIOS = {
  balanced: { protein: 0.3, carbs: 0.4, fat: 0.3 },
  low_carb: { protein: 0.35, carbs: 0.25, fat: 0.4 },
  high_protein: { protein: 0.4, carbs: 0.35, fat: 0.25 },
  keto: { protein: 0.25, carbs: 0.05, fat: 0.7 },
};

export const MEAL_TYPES = [
  { value: 'breakfast', label: 'Breakfast' },
  { value: 'lunch', label: 'Lunch' },
  { value: 'dinner', label: 'Dinner' },
  { value: 'snack', label: 'Snack' },
] as const;

