import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Text } from 'react-native-paper';
import { COLORS, SPACING, FONT_SIZES, BORDER_RADIUS } from '@constants';
import { formatCalories, formatMacro } from '@utils';

interface NutritionCardProps {
  calories?: number;
  protein?: number;
  carbs?: number;
  fat?: number;
  fiber?: number;
  title?: string;
}

export const NutritionCard: React.FC<NutritionCardProps> = ({
  calories = 0,
  protein = 0,
  carbs = 0,
  fat = 0,
  fiber,
  title = 'Nutrition',
}) => {
  return (
    <Card style={styles.card}>
      <Card.Content>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.grid}>
          <View style={styles.item}>
            <Text style={[styles.value, { color: COLORS.calories }]}>
              {formatCalories(calories)}
            </Text>
            <Text style={styles.label}>Calories</Text>
          </View>
          <View style={styles.item}>
            <Text style={[styles.value, { color: COLORS.protein }]}>
              {formatMacro(protein)}g
            </Text>
            <Text style={styles.label}>Protein</Text>
          </View>
          <View style={styles.item}>
            <Text style={[styles.value, { color: COLORS.carbs }]}>
              {formatMacro(carbs)}g
            </Text>
            <Text style={styles.label}>Carbs</Text>
          </View>
          <View style={styles.item}>
            <Text style={[styles.value, { color: COLORS.fat }]}>
              {formatMacro(fat)}g
            </Text>
            <Text style={styles.label}>Fat</Text>
          </View>
          {fiber !== undefined && (
            <View style={styles.item}>
              <Text style={[styles.value, { color: COLORS.fiber }]}>
                {formatMacro(fiber)}g
              </Text>
              <Text style={styles.label}>Fiber</Text>
            </View>
          )}
        </View>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: SPACING.md,
    borderRadius: BORDER_RADIUS.lg,
  },
  title: {
    fontSize: FONT_SIZES.lg,
    fontWeight: 'bold',
    marginBottom: SPACING.md,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  item: {
    width: '48%',
    marginBottom: SPACING.md,
    alignItems: 'center',
  },
  value: {
    fontSize: FONT_SIZES.xxl,
    fontWeight: 'bold',
  },
  label: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
    marginTop: SPACING.xs,
  },
});

