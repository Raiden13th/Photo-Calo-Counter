import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { COLORS, SPACING, FONT_SIZES, BORDER_RADIUS } from '@constants';
import { formatPercentage } from '@utils';

interface MacroBarProps {
  label: string;
  current: number;
  goal: number;
  color: string;
}

export const MacroBar: React.FC<MacroBarProps> = ({
  label,
  current,
  goal,
  color,
}) => {
  const percentage = goal > 0 ? Math.min((current / goal) * 100, 100) : 0;
  const isOverGoal = current > goal;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.label}>{label}</Text>
        <Text style={[styles.value, isOverGoal && styles.overGoal]}>
          {Math.round(current)} / {Math.round(goal)}
        </Text>
      </View>
      <View style={styles.barContainer}>
        <View
          style={[
            styles.barFill,
            {
              width: `${percentage}%`,
              backgroundColor: isOverGoal ? COLORS.warning : color,
            },
          ]}
        />
      </View>
      <Text style={styles.percentage}>{formatPercentage(percentage)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: SPACING.md,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SPACING.xs,
  },
  label: {
    fontSize: FONT_SIZES.md,
    fontWeight: '600',
  },
  value: {
    fontSize: FONT_SIZES.md,
    color: COLORS.textSecondary,
  },
  overGoal: {
    color: COLORS.warning,
  },
  barContainer: {
    height: 8,
    backgroundColor: COLORS.disabled,
    borderRadius: BORDER_RADIUS.sm,
    overflow: 'hidden',
  },
  barFill: {
    height: '100%',
    borderRadius: BORDER_RADIUS.sm,
  },
  percentage: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
    marginTop: SPACING.xs,
    textAlign: 'right',
  },
});

