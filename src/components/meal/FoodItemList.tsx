import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { List, Text, Divider } from 'react-native-paper';
import { FoodItem } from '@types';
import { COLORS, SPACING, FONT_SIZES } from '@constants';
import { formatCalories, formatMacro } from '@utils';

interface FoodItemListProps {
  foods: FoodItem[];
}

export const FoodItemList: React.FC<FoodItemListProps> = ({ foods }) => {
  const renderItem = ({ item }: { item: FoodItem }) => (
    <>
      <List.Item
        title={item.food_name}
        description={
          item.quantity && item.unit
            ? `${item.quantity} ${item.unit}`
            : undefined
        }
        right={() => (
          <View style={styles.nutrition}>
            <Text style={styles.calories}>
              {formatCalories(item.calories || 0)} cal
            </Text>
            <Text style={styles.macros}>
              P: {formatMacro(item.protein_g || 0)}g | C:{' '}
              {formatMacro(item.carbs_g || 0)}g | F:{' '}
              {formatMacro(item.fat_g || 0)}g
            </Text>
          </View>
        )}
      />
      <Divider />
    </>
  );

  return (
    <FlatList
      data={foods}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      ListEmptyComponent={
        <View style={styles.empty}>
          <Text style={styles.emptyText}>No food items detected</Text>
        </View>
      }
    />
  );
};

const styles = StyleSheet.create({
  nutrition: {
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingRight: SPACING.md,
  },
  calories: {
    fontSize: FONT_SIZES.md,
    fontWeight: 'bold',
    color: COLORS.calories,
  },
  macros: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.textSecondary,
    marginTop: SPACING.xs,
  },
  empty: {
    padding: SPACING.xl,
    alignItems: 'center',
  },
  emptyText: {
    color: COLORS.textSecondary,
  },
});

