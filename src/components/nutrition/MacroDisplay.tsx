import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS, SPACING, FONT_SIZES, BORDER_RADIUS } from '@constants';
import { formatMacro } from '@utils';

interface MacroDisplayProps {
  calories?: number;
  protein?: number;
  carbs?: number;
  fat?: number;
  variant?: 'compact' | 'detailed';
}

export const MacroDisplay: React.FC<MacroDisplayProps> = ({
  calories = 0,
  protein = 0,
  carbs = 0,
  fat = 0,
  variant = 'detailed',
}) => {
  if (variant === 'compact') {
    return (
      <View style={styles.compactContainer}>
        <MacroItem
          icon="fire"
          value={Math.round(calories)}
          label="Calories"
          color={COLORS.calories}
          compact
        />
        <MacroItem
          icon="food-drumstick"
          value={formatMacro(protein)}
          unit="g"
          label="Protein"
          color={COLORS.protein}
          compact
        />
        <MacroItem
          icon="bread-slice"
          value={formatMacro(carbs)}
          unit="g"
          label="Carbs"
          color={COLORS.carbs}
          compact
        />
        <MacroItem
          icon="water"
          value={formatMacro(fat)}
          unit="g"
          label="Fats"
          color={COLORS.fat}
          compact
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Large Calorie Display */}
      <View style={styles.calorieCard}>
        <MaterialCommunityIcons name="fire" size={32} color={COLORS.calories} />
        <View style={styles.calorieContent}>
          <Text style={styles.calorieLabel}>Calories</Text>
          <Text style={styles.calorieValue}>{Math.round(calories)}</Text>
        </View>
      </View>

      {/* Macro Grid */}
      <View style={styles.macroGrid}>
        <MacroItem
          icon="food-drumstick"
          value={formatMacro(protein)}
          unit="g"
          label="Protein"
          color={COLORS.protein}
        />
        <MacroItem
          icon="bread-slice"
          value={formatMacro(carbs)}
          unit="g"
          label="Carbs"
          color={COLORS.carbs}
        />
        <MacroItem
          icon="water"
          value={formatMacro(fat)}
          unit="g"
          label="Fats"
          color={COLORS.fat}
        />
      </View>
    </View>
  );
};

interface MacroItemProps {
  icon: string;
  value: number;
  unit?: string;
  label: string;
  color: string;
  compact?: boolean;
}

const MacroItem: React.FC<MacroItemProps> = ({
  icon,
  value,
  unit,
  label,
  color,
  compact = false,
}) => {
  if (compact) {
    return (
      <View style={styles.compactItem}>
        <MaterialCommunityIcons name={icon as any} size={16} color={color} />
        <Text style={[styles.compactValue, { color }]}>
          {value}
          {unit}
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.macroItem}>
      <View style={[styles.macroIconContainer, { backgroundColor: `${color}15` }]}>
        <MaterialCommunityIcons name={icon as any} size={20} color={color} />
      </View>
      <Text style={styles.macroLabel}>{label}</Text>
      <Text style={[styles.macroValue, { color }]}>
        {value}
        {unit}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: SPACING.md,
  },
  calorieCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    padding: SPACING.lg,
    borderRadius: BORDER_RADIUS.lg,
    gap: SPACING.md,
    shadowColor: COLORS.cardShadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 2,
  },
  calorieContent: {
    flex: 1,
  },
  calorieLabel: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
    marginBottom: SPACING.xs,
  },
  calorieValue: {
    fontSize: FONT_SIZES.xxxl,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  macroGrid: {
    flexDirection: 'row',
    gap: SPACING.sm,
  },
  macroItem: {
    flex: 1,
    backgroundColor: COLORS.surface,
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    alignItems: 'center',
    gap: SPACING.xs,
    shadowColor: COLORS.cardShadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 1,
  },
  macroIconContainer: {
    width: 40,
    height: 40,
    borderRadius: BORDER_RADIUS.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  macroLabel: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.textSecondary,
    textAlign: 'center',
  },
  macroValue: {
    fontSize: FONT_SIZES.lg,
    fontWeight: 'bold',
  },
  compactContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: SPACING.sm,
  },
  compactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.xs,
  },
  compactValue: {
    fontSize: FONT_SIZES.sm,
    fontWeight: '600',
  },
});

