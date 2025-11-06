import React from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Card, Text, Chip } from 'react-native-paper';
import { Meal } from '@types';
import { COLORS, SPACING, FONT_SIZES, BORDER_RADIUS } from '@constants';
import { formatCalories, formatMacro, formatTime, formatMealType } from '@utils';

interface MealCardProps {
  meal: Meal;
  onPress?: () => void;
}

export const MealCard: React.FC<MealCardProps> = ({ meal, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} disabled={!onPress}>
      <Card style={styles.card}>
        <View style={styles.container}>
          {meal.image_url && (
            <Image
              source={{ uri: meal.thumbnail_url || meal.image_url }}
              style={styles.image}
            />
          )}
          <View style={styles.content}>
            <View style={styles.header}>
              <Text style={styles.time}>{formatTime(meal.created_at)}</Text>
              {meal.meal_type && (
                <Chip style={styles.chip} textStyle={styles.chipText}>
                  {formatMealType(meal.meal_type)}
                </Chip>
              )}
            </View>
            <View style={styles.nutrition}>
              <View style={styles.nutritionItem}>
                <Text style={[styles.nutritionValue, { color: COLORS.calories }]}>
                  {formatCalories(meal.total_calories || 0)}
                </Text>
                <Text style={styles.nutritionLabel}>cal</Text>
              </View>
              <View style={styles.nutritionItem}>
                <Text style={[styles.nutritionValue, { color: COLORS.protein }]}>
                  {formatMacro(meal.total_protein_g || 0)}g
                </Text>
                <Text style={styles.nutritionLabel}>protein</Text>
              </View>
              <View style={styles.nutritionItem}>
                <Text style={[styles.nutritionValue, { color: COLORS.carbs }]}>
                  {formatMacro(meal.total_carbs_g || 0)}g
                </Text>
                <Text style={styles.nutritionLabel}>carbs</Text>
              </View>
              <View style={styles.nutritionItem}>
                <Text style={[styles.nutritionValue, { color: COLORS.fat }]}>
                  {formatMacro(meal.total_fat_g || 0)}g
                </Text>
                <Text style={styles.nutritionLabel}>fat</Text>
              </View>
            </View>
            {meal.notes && (
              <Text style={styles.notes} numberOfLines={2}>
                {meal.notes}
              </Text>
            )}
          </View>
        </View>
      </Card>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    marginHorizontal: SPACING.md,
    marginVertical: SPACING.sm,
    borderRadius: BORDER_RADIUS.lg,
  },
  container: {
    flexDirection: 'row',
    padding: SPACING.md,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: BORDER_RADIUS.md,
    marginRight: SPACING.md,
  },
  content: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  time: {
    fontSize: FONT_SIZES.md,
    fontWeight: '600',
  },
  chip: {
    height: 24,
  },
  chipText: {
    fontSize: FONT_SIZES.xs,
  },
  nutrition: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SPACING.sm,
  },
  nutritionItem: {
    alignItems: 'center',
  },
  nutritionValue: {
    fontSize: FONT_SIZES.md,
    fontWeight: 'bold',
  },
  nutritionLabel: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.textSecondary,
  },
  notes: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
    fontStyle: 'italic',
  },
});

