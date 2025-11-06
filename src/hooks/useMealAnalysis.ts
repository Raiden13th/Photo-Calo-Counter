import { useState } from 'react';
import { useAuthStore, useMealStore, useAppStore } from '@store';
import { DatabaseService, StorageService, AIService } from '@services';
import { processImage, createThumbnail, imageToBase64 } from '@utils';
import { Meal, FoodItem } from '@types';

/**
 * Hook for analyzing meal images
 */
export const useMealAnalysis = () => {
  const { user } = useAuthStore();
  const { addMeal } = useMealStore();
  const { setProcessing, showNotification } = useAppStore();
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [progress, setProgress] = useState(0);

  const analyzeMeal = async (imageUri: string): Promise<Meal | null> => {
    if (!user) {
      showNotification('Please sign in to analyze meals', 'error');
      return null;
    }

    try {
      setIsAnalyzing(true);
      setProcessing(true);
      setProgress(10);

      // Step 1: Process image
      const processedImage = await processImage(imageUri, {
        maxSize: 1024,
        quality: 0.7,
      });
      setProgress(20);

      // Step 2: Create thumbnail
      const thumbnailUri = await createThumbnail(imageUri, 200);
      setProgress(30);

      // Step 3: Create meal record
      const meal = await DatabaseService.createMeal({
        user_id: user.id,
        processing_status: 'processing',
        image_url: '', // Will be updated after upload
        thumbnail_url: '',
      });
      setProgress(40);

      // Step 4: Upload images
      const [imageUrl, thumbnailUrl] = await Promise.all([
        StorageService.uploadImage(processedImage.uri, user.id, meal.id),
        StorageService.uploadThumbnail(thumbnailUri, user.id, meal.id),
      ]);
      setProgress(60);

      // Step 5: Analyze with AI
      const base64Image = await imageToBase64(processedImage.uri);
      const aiResult = await AIService.analyzeFoodImage(base64Image);
      setProgress(80);

      // Step 6: Create food items
      const foodItems: Partial<FoodItem>[] = aiResult.foods.map((food) => ({
        meal_id: meal.id,
        food_name: food.name,
        quantity: food.quantity,
        unit: food.unit,
        calories: food.nutrition.calories,
        protein_g: food.nutrition.protein_g,
        carbs_g: food.nutrition.carbs_g,
        fat_g: food.nutrition.fat_g,
        fiber_g: food.nutrition.fiber_g,
        sugar_g: food.nutrition.sugar_g,
        confidence_score: food.confidence,
      }));

      await DatabaseService.createFoodItems(foodItems);
      setProgress(90);

      // Step 7: Update meal with results
      const updatedMeal = await DatabaseService.updateMeal(meal.id, {
        image_url: imageUrl,
        thumbnail_url: thumbnailUrl,
        total_calories: aiResult.totalNutrition.calories,
        total_protein_g: aiResult.totalNutrition.protein_g,
        total_carbs_g: aiResult.totalNutrition.carbs_g,
        total_fat_g: aiResult.totalNutrition.fat_g,
        total_fiber_g: aiResult.totalNutrition.fiber_g,
        total_sugar_g: aiResult.totalNutrition.sugar_g,
        confidence_score: aiResult.confidence,
        processing_status: 'completed',
        ai_analysis: aiResult,
      });

      setProgress(100);

      // Add to store
      addMeal(updatedMeal);

      showNotification('Meal analyzed successfully!', 'success');

      return updatedMeal;
    } catch (error: any) {
      console.error('Error analyzing meal:', error);
      showNotification(
        error.message || 'Failed to analyze meal',
        'error'
      );
      return null;
    } finally {
      setIsAnalyzing(false);
      setProcessing(false);
      setProgress(0);
    }
  };

  return {
    analyzeMeal,
    isAnalyzing,
    progress,
  };
};

