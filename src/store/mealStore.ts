import { create } from 'zustand';
import { Meal, FoodItem } from '@types';

interface MealState {
  meals: Meal[];
  currentMeal: Meal | null;
  currentFoods: FoodItem[];
  isLoading: boolean;
  error: string | null;

  // Actions
  setMeals: (meals: Meal[]) => void;
  setCurrentMeal: (meal: Meal | null) => void;
  setCurrentFoods: (foods: FoodItem[]) => void;
  addMeal: (meal: Meal) => void;
  updateMeal: (id: string, updates: Partial<Meal>) => void;
  deleteMeal: (id: string) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  clearCurrentMeal: () => void;
}

export const useMealStore = create<MealState>((set) => ({
  meals: [],
  currentMeal: null,
  currentFoods: [],
  isLoading: false,
  error: null,

  setMeals: (meals) => set({ meals }),
  setCurrentMeal: (meal) => set({ currentMeal: meal }),
  setCurrentFoods: (foods) => set({ currentFoods: foods }),

  addMeal: (meal) =>
    set((state) => ({
      meals: [meal, ...state.meals],
    })),

  updateMeal: (id, updates) =>
    set((state) => ({
      meals: state.meals.map((meal) =>
        meal.id === id ? { ...meal, ...updates } : meal
      ),
      currentMeal:
        state.currentMeal?.id === id
          ? { ...state.currentMeal, ...updates }
          : state.currentMeal,
    })),

  deleteMeal: (id) =>
    set((state) => ({
      meals: state.meals.filter((meal) => meal.id !== id),
      currentMeal: state.currentMeal?.id === id ? null : state.currentMeal,
    })),

  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),

  clearCurrentMeal: () =>
    set({
      currentMeal: null,
      currentFoods: [],
    }),
}));

