import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, Image, TouchableOpacity, TextInput } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Text, IconButton, Divider } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MacroDisplay } from '@components/nutrition';
import { FoodItemList } from '@components/meal';
import { LoadingSpinner, ErrorMessage, Button } from '@components/common';
import { useMealStore } from '@store';
import { DatabaseService } from '@services';
import { Meal, FoodItem } from '@types';
import { COLORS, SPACING, FONT_SIZES, BORDER_RADIUS } from '@constants';
import { formatDateTime, formatMealType } from '@utils';

export default function MealDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { setCurrentMeal, setCurrentFoods } = useMealStore();
  const [meal, setMeal] = useState<Meal | null>(null);
  const [foods, setFoods] = useState<FoodItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [mealName, setMealName] = useState('');
  const [isEditingName, setIsEditingName] = useState(false);

  useEffect(() => {
    const fetchMealData = async () => {
      if (!id) return;

      try {
        setIsLoading(true);
        setError(null);

        const [mealData, foodsData] = await Promise.all([
          DatabaseService.getMealById(id),
          DatabaseService.getFoodItemsByMealId(id),
        ]);

        if (mealData) {
          setMeal(mealData);
          setFoods(foodsData);
          setCurrentMeal(mealData);
          setCurrentFoods(foodsData);
          // Set initial meal name from notes or generate from food items
          setMealName(mealData.notes || generateMealName(foodsData));
        } else {
          setError('Meal not found');
        }
      } catch (err: any) {
        console.error('Error fetching meal:', err);
        setError(err.message || 'Failed to load meal');
      } finally {
        setIsLoading(false);
      }
    };

    fetchMealData();
  }, [id]);

  const generateMealName = (foodItems: FoodItem[]): string => {
    if (foodItems.length === 0) return 'Untitled Meal';
    if (foodItems.length === 1) return foodItems[0].name;
    return `${foodItems[0].name} and more`;
  };

  if (isLoading) {
    return <LoadingSpinner message="Loading meal details..." />;
  }

  if (error) {
    return (
      <ErrorMessage
        message={error}
        onRetry={() => router.back()}
      />
    );
  }

  if (!meal) {
    return (
      <ErrorMessage
        message="Meal not found"
        onRetry={() => router.back()}
      />
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <IconButton
          icon="arrow-left"
          size={24}
          onPress={() => router.back()}
          iconColor={COLORS.text}
        />
        <Text style={styles.headerTitle}>Meal Details</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          {/* Meal Name - Editable */}
          <View style={styles.mealNameContainer}>
            {isEditingName ? (
              <TextInput
                style={styles.mealNameInput}
                value={mealName}
                onChangeText={setMealName}
                onBlur={() => setIsEditingName(false)}
                autoFocus
                placeholder="Enter meal name"
                placeholderTextColor={COLORS.placeholder}
              />
            ) : (
              <TouchableOpacity onPress={() => setIsEditingName(true)}>
                <Text style={styles.mealName}>{mealName}</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity onPress={() => setIsEditingName(true)}>
              <MaterialCommunityIcons name="pencil" size={20} color={COLORS.textSecondary} />
            </TouchableOpacity>
          </View>

          {/* Macro Display */}
          <MacroDisplay
            calories={meal.total_calories}
            protein={meal.total_protein_g}
            carbs={meal.total_carbs_g}
            fat={meal.total_fat_g}
          />

          {/* Meal Items Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Meal Items</Text>

            {foods.map((food, index) => (
              <View key={food.id} style={styles.foodItem}>
                <View style={styles.foodItemHeader}>
                  <MaterialCommunityIcons
                    name="food-apple"
                    size={20}
                    color={COLORS.textSecondary}
                  />
                  <Text style={styles.foodItemName}>{food.name}</Text>
                  <TouchableOpacity>
                    <MaterialCommunityIcons
                      name="delete-outline"
                      size={20}
                      color={COLORS.error}
                    />
                  </TouchableOpacity>
                </View>
                <View style={styles.foodItemNutrition}>
                  <Text style={styles.foodItemCalories}>
                    {Math.round(food.calories || 0)} cal
                  </Text>
                </View>
              </View>
            ))}

            {/* Add Items Button */}
            <TouchableOpacity style={styles.addItemButton}>
              <MaterialCommunityIcons name="plus" size={20} color={COLORS.textSecondary} />
              <Text style={styles.addItemText}>Add items to this meal</Text>
            </TouchableOpacity>
          </View>

          {/* Action Button */}
          <View style={styles.actionContainer}>
            <Button onPress={() => router.back()}>
              Save Changes
            </Button>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.sm,
    paddingTop: SPACING.md,
    paddingBottom: SPACING.sm,
    backgroundColor: COLORS.surface,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  headerTitle: {
    fontSize: FONT_SIZES.lg,
    fontWeight: '600',
    color: COLORS.text,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: SPACING.lg,
  },
  mealNameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.surfaceVariant,
    padding: SPACING.lg,
    borderRadius: BORDER_RADIUS.lg,
    marginBottom: SPACING.lg,
  },
  mealName: {
    fontSize: FONT_SIZES.xxl,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  mealNameInput: {
    fontSize: FONT_SIZES.xxl,
    fontWeight: 'bold',
    color: COLORS.text,
    flex: 1,
    padding: 0,
  },
  section: {
    marginTop: SPACING.lg,
  },
  sectionTitle: {
    fontSize: FONT_SIZES.lg,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: SPACING.md,
  },
  foodItem: {
    backgroundColor: COLORS.surface,
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.lg,
    marginBottom: SPACING.sm,
    shadowColor: COLORS.cardShadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 1,
  },
  foodItemHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
    marginBottom: SPACING.xs,
  },
  foodItemName: {
    flex: 1,
    fontSize: FONT_SIZES.md,
    fontWeight: '600',
    color: COLORS.text,
  },
  foodItemNutrition: {
    marginLeft: 28,
  },
  foodItemCalories: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
  },
  addItemButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.surface,
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.lg,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    borderStyle: 'dashed',
    gap: SPACING.sm,
    marginTop: SPACING.sm,
  },
  addItemText: {
    fontSize: FONT_SIZES.md,
    color: COLORS.textSecondary,
  },
  actionContainer: {
    marginTop: SPACING.xl,
    marginBottom: SPACING.xxl,
  },
});

