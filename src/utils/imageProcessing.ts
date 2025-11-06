import * as ImageManipulator from 'expo-image-manipulator';
import * as FileSystem from 'expo-file-system';
import { ENV } from '@config/env';

export interface ProcessedImage {
  uri: string;
  width: number;
  height: number;
  base64?: string;
}

/**
 * Process and optimize an image for upload
 * - Resize to max dimension
 * - Compress to reduce file size
 * - Auto-orient based on EXIF data
 */
export const processImage = async (
  uri: string,
  options?: {
    maxSize?: number;
    quality?: number;
    includeBase64?: boolean;
  }
): Promise<ProcessedImage> => {
  const maxSize = options?.maxSize || ENV.MAX_IMAGE_SIZE;
  const quality = options?.quality || ENV.IMAGE_QUALITY;

  try {
    // Get image info
    const imageInfo = await FileSystem.getInfoAsync(uri);
    if (!imageInfo.exists) {
      throw new Error('Image file does not exist');
    }

    // Resize and compress
    const manipResult = await ImageManipulator.manipulateAsync(
      uri,
      [
        { resize: { width: maxSize } }, // Maintains aspect ratio
      ],
      {
        compress: quality,
        format: ImageManipulator.SaveFormat.JPEG,
        base64: options?.includeBase64,
      }
    );

    return {
      uri: manipResult.uri,
      width: manipResult.width,
      height: manipResult.height,
      base64: manipResult.base64,
    };
  } catch (error) {
    console.error('Error processing image:', error);
    throw new Error('Failed to process image');
  }
};

/**
 * Create a thumbnail from an image
 */
export const createThumbnail = async (
  uri: string,
  size: number = 200
): Promise<string> => {
  try {
    const manipResult = await ImageManipulator.manipulateAsync(
      uri,
      [{ resize: { width: size } }],
      {
        compress: 0.5,
        format: ImageManipulator.SaveFormat.JPEG,
      }
    );

    return manipResult.uri;
  } catch (error) {
    console.error('Error creating thumbnail:', error);
    throw new Error('Failed to create thumbnail');
  }
};

/**
 * Convert image to base64 string
 */
export const imageToBase64 = async (uri: string): Promise<string> => {
  try {
    const base64 = await FileSystem.readAsStringAsync(uri, {
      encoding: FileSystem.EncodingType.Base64,
    });
    return base64;
  } catch (error) {
    console.error('Error converting image to base64:', error);
    throw new Error('Failed to convert image to base64');
  }
};

/**
 * Get image file size in bytes
 */
export const getImageSize = async (uri: string): Promise<number> => {
  try {
    const info = await FileSystem.getInfoAsync(uri);
    return info.exists && 'size' in info ? info.size : 0;
  } catch (error) {
    console.error('Error getting image size:', error);
    return 0;
  }
};

/**
 * Validate image file
 */
export const validateImage = async (uri: string): Promise<boolean> => {
  try {
    const info = await FileSystem.getInfoAsync(uri);
    if (!info.exists) {
      return false;
    }

    // Check file size (max 10MB)
    const maxSize = 10 * 1024 * 1024; // 10MB
    if ('size' in info && info.size > maxSize) {
      throw new Error('Image file is too large (max 10MB)');
    }

    return true;
  } catch (error) {
    console.error('Error validating image:', error);
    return false;
  }
};

