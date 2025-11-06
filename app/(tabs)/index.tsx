import React from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { CameraView } from '@components/camera';
import { LoadingSpinner } from '@components/common';
import { useMealAnalysis } from '@hooks';

export default function CameraScreen() {
  const router = useRouter();
  const { analyzeMeal, isAnalyzing, progress } = useMealAnalysis();

  const handleCapture = async (uri: string) => {
    try {
      const meal = await analyzeMeal(uri);

      if (meal) {
        // Navigate to meal detail screen
        router.push(`/meal/${meal.id}`);
      }
    } catch (error) {
      console.error('Error processing image:', error);
      Alert.alert('Error', 'Failed to process image. Please try again.');
    }
  };

  if (isAnalyzing) {
    return (
      <LoadingSpinner
        message={`Analyzing meal... ${Math.round(progress)}%`}
      />
    );
  }

  return (
    <View style={styles.container}>
      <CameraView onCapture={handleCapture} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

