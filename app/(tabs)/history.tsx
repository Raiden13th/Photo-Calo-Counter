import React from 'react';
import { View, StyleSheet, FlatList, RefreshControl } from 'react-native';
import { useRouter } from 'expo-router';
import { MealCard } from '@components/meal';
import { LoadingSpinner, EmptyState } from '@components/common';
import { useMeals } from '@hooks';
import { useMealStore } from '@store';
import { SPACING } from '@constants';

export default function HistoryScreen() {
  const router = useRouter();
  const { meals, isRefreshing, refreshMeals } = useMeals();
  const { isLoading } = useMealStore();

  const handleMealPress = (mealId: string) => {
    router.push(`/meal/${mealId}`);
  };

  if (isLoading && meals.length === 0) {
    return <LoadingSpinner message="Loading meals..." />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={meals}
        renderItem={({ item }) => (
          <MealCard meal={item} onPress={() => handleMealPress(item.id)} />
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={refreshMeals} />
        }
        ListEmptyComponent={
          <EmptyState
            title="No Meals Yet"
            message="Start tracking your nutrition by taking a photo of your meal!"
            actionLabel="Take Photo"
            onAction={() => router.push('/')}
          />
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    paddingVertical: SPACING.md,
  },
});

