import { supabase } from '@config/supabase';
import { Meal, FoodItem, UserGoal, DailySummary } from '@types';

/**
 * Database service for Supabase operations
 */
export class DatabaseService {
  /**
   * Meals
   */
  static async getMeals(userId: string, limit: number = 50): Promise<Meal[]> {
    const { data, error } = await supabase
      .from('meals')
      .select('*')
      .eq('user_id', userId)
      .is('deleted_at', null)
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) throw error;
    return data || [];
  }

  static async getMealById(mealId: string): Promise<Meal | null> {
    const { data, error } = await supabase
      .from('meals')
      .select('*')
      .eq('id', mealId)
      .single();

    if (error) throw error;
    return data;
  }

  static async createMeal(meal: Partial<Meal>): Promise<Meal> {
    const { data, error } = await supabase
      .from('meals')
      .insert(meal)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  static async updateMeal(
    mealId: string,
    updates: Partial<Meal>
  ): Promise<Meal> {
    const { data, error } = await supabase
      .from('meals')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', mealId)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  static async deleteMeal(mealId: string): Promise<void> {
    const { error } = await supabase
      .from('meals')
      .update({ deleted_at: new Date().toISOString() })
      .eq('id', mealId);

    if (error) throw error;
  }

  /**
   * Food Items
   */
  static async getFoodItemsByMealId(mealId: string): Promise<FoodItem[]> {
    const { data, error } = await supabase
      .from('food_items')
      .select('*')
      .eq('meal_id', mealId)
      .order('created_at', { ascending: true });

    if (error) throw error;
    return data || [];
  }

  static async createFoodItems(
    foodItems: Partial<FoodItem>[]
  ): Promise<FoodItem[]> {
    const { data, error } = await supabase
      .from('food_items')
      .insert(foodItems)
      .select();

    if (error) throw error;
    return data || [];
  }

  /**
   * User Goals
   */
  static async getUserGoal(userId: string): Promise<UserGoal | null> {
    const { data, error } = await supabase
      .from('user_goals')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (error && error.code !== 'PGRST116') throw error; // PGRST116 = no rows
    return data;
  }

  static async upsertUserGoal(goal: Partial<UserGoal>): Promise<UserGoal> {
    const { data, error } = await supabase
      .from('user_goals')
      .upsert(goal)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  /**
   * Daily Summaries
   */
  static async getDailySummary(
    userId: string,
    date: string
  ): Promise<DailySummary | null> {
    const { data, error } = await supabase
      .from('daily_summaries')
      .select('*')
      .eq('user_id', userId)
      .eq('date', date)
      .single();

    if (error && error.code !== 'PGRST116') throw error;
    return data;
  }

  static async getDailySummaries(
    userId: string,
    startDate: string,
    endDate: string
  ): Promise<DailySummary[]> {
    const { data, error } = await supabase
      .from('daily_summaries')
      .select('*')
      .eq('user_id', userId)
      .gte('date', startDate)
      .lte('date', endDate)
      .order('date', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  /**
   * Analytics
   */
  static async logAnalyticsEvent(
    userId: string | null,
    eventType: string,
    eventData?: any
  ): Promise<void> {
    const { error } = await supabase.from('app_analytics').insert({
      user_id: userId,
      event_type: eventType,
      event_data: eventData,
    });

    if (error) console.error('Error logging analytics:', error);
  }
}

