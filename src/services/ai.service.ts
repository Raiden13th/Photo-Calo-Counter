import { ENV } from '@config/env';
import { AIAnalysisResult, DetectedFood, NutritionInfo } from '@types';

/**
 * AI service for food recognition and nutrition analysis using DeepSeek
 */
export class AIService {
  private static API_URL = ENV.DEEPSEEK_API_URL;
  private static API_KEY = ENV.DEEPSEEK_API_KEY;

  /**
   * Analyze a food image and extract nutrition information
   */
  static async analyzeFoodImage(
    imageBase64: string
  ): Promise<AIAnalysisResult> {
    const startTime = Date.now();

    try {
      // Prepare the prompt for DeepSeek
      const prompt = this.buildAnalysisPrompt();

      // Call DeepSeek API
      const response = await fetch(`${this.API_URL}/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.API_KEY}`,
        },
        body: JSON.stringify({
          model: 'deepseek-chat',
          messages: [
            {
              role: 'system',
              content: prompt,
            },
            {
              role: 'user',
              content: [
                {
                  type: 'image_url',
                  image_url: {
                    url: `data:image/jpeg;base64,${imageBase64}`,
                  },
                },
                {
                  type: 'text',
                  content:
                    'Analyze this food image and provide detailed nutrition information.',
                },
              ],
            },
          ],
          temperature: 0.3,
          max_tokens: 2000,
        }),
      });

      if (!response.ok) {
        throw new Error(`API request failed: ${response.statusText}`);
      }

      const data = await response.json();
      const aiResponse = data.choices[0]?.message?.content;

      if (!aiResponse) {
        throw new Error('No response from AI');
      }

      // Parse the AI response
      const result = this.parseAIResponse(aiResponse);

      const processingTime = Date.now() - startTime;

      return {
        ...result,
        processingTime,
        modelVersion: data.model || 'deepseek-chat',
      };
    } catch (error) {
      console.error('Error analyzing food image:', error);
      throw new Error('Failed to analyze food image');
    }
  }

  /**
   * Build the analysis prompt for DeepSeek
   */
  private static buildAnalysisPrompt(): string {
    return `You are a nutrition expert AI. Analyze food images and provide detailed nutrition information.

For each food item detected in the image, provide:
1. Food name
2. Estimated quantity and unit (e.g., "1 cup", "150g", "1 piece")
3. Nutrition information per item:
   - Calories (kcal)
   - Protein (g)
   - Carbohydrates (g)
   - Fat (g)
   - Fiber (g, if applicable)
   - Sugar (g, if applicable)
4. Confidence score (0-1)

Respond ONLY with valid JSON in this exact format:
{
  "foods": [
    {
      "name": "Food name",
      "quantity": 1,
      "unit": "cup",
      "nutrition": {
        "calories": 200,
        "protein_g": 10,
        "carbs_g": 30,
        "fat_g": 5,
        "fiber_g": 3,
        "sugar_g": 5
      },
      "confidence": 0.85
    }
  ]
}

Be as accurate as possible with portion sizes and nutrition values. Use USDA nutrition database standards.`;
  }

  /**
   * Parse the AI response into structured data
   */
  private static parseAIResponse(response: string): Omit<AIAnalysisResult, 'processingTime' | 'modelVersion'> {
    try {
      // Extract JSON from response (in case there's extra text)
      const jsonMatch = response.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error('No JSON found in response');
      }

      const parsed = JSON.parse(jsonMatch[0]);

      // Convert to our format
      const foods: DetectedFood[] = parsed.foods.map((food: any) => ({
        name: food.name,
        quantity: food.quantity,
        unit: food.unit,
        nutrition: {
          calories: food.nutrition.calories || 0,
          protein_g: food.nutrition.protein_g || 0,
          carbs_g: food.nutrition.carbs_g || 0,
          fat_g: food.nutrition.fat_g || 0,
          fiber_g: food.nutrition.fiber_g,
          sugar_g: food.nutrition.sugar_g,
        },
        confidence: food.confidence || 0.5,
      }));

      // Calculate total nutrition
      const totalNutrition: NutritionInfo = foods.reduce(
        (acc, food) => ({
          calories: acc.calories + food.nutrition.calories,
          protein_g: acc.protein_g + food.nutrition.protein_g,
          carbs_g: acc.carbs_g + food.nutrition.carbs_g,
          fat_g: acc.fat_g + food.nutrition.fat_g,
          fiber_g: (acc.fiber_g || 0) + (food.nutrition.fiber_g || 0),
          sugar_g: (acc.sugar_g || 0) + (food.nutrition.sugar_g || 0),
        }),
        { calories: 0, protein_g: 0, carbs_g: 0, fat_g: 0, fiber_g: 0, sugar_g: 0 }
      );

      // Calculate average confidence
      const avgConfidence =
        foods.reduce((sum, food) => sum + food.confidence, 0) / foods.length;

      return {
        foods,
        totalNutrition,
        confidence: avgConfidence,
      };
    } catch (error) {
      console.error('Error parsing AI response:', error);
      throw new Error('Failed to parse AI response');
    }
  }
}

