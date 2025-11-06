import { useState, useEffect } from 'react';
import { useMealStore, useAuthStore } from '@store';
import { DatabaseService } from '@services';
import { Meal } from '@types';

/**
 * Hook for managing meals
 */
export const useMeals = () => {
  const { user } = useAuthStore();
  const { meals, setMeals, setLoading, setError } = useMealStore();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchMeals = async () => {
    if (!user) return;

    try {
      setLoading(true);
      setError(null);
      const data = await DatabaseService.getMeals(user.id);
      setMeals(data);
    } catch (error: any) {
      console.error('Error fetching meals:', error);
      setError(error.message || 'Failed to fetch meals');
    } finally {
      setLoading(false);
    }
  };

  const refreshMeals = async () => {
    setIsRefreshing(true);
    await fetchMeals();
    setIsRefreshing(false);
  };

  useEffect(() => {
    fetchMeals();
  }, [user]);

  return {
    meals,
    isRefreshing,
    refreshMeals,
    fetchMeals,
  };
};

