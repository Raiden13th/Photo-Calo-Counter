import { supabase } from '@config/supabase';
import * as FileSystem from 'expo-file-system';
import { decode } from 'base64-arraybuffer';

/**
 * Storage service for Supabase Storage operations
 */
export class StorageService {
  private static BUCKET_NAME = 'meal-images';
  private static THUMBNAIL_BUCKET_NAME = 'meal-thumbnails';

  /**
   * Upload an image to Supabase Storage
   */
  static async uploadImage(
    uri: string,
    userId: string,
    mealId: string
  ): Promise<string> {
    try {
      // Read file as base64
      const base64 = await FileSystem.readAsStringAsync(uri, {
        encoding: FileSystem.EncodingType.Base64,
      });

      // Convert base64 to ArrayBuffer
      const arrayBuffer = decode(base64);

      // Generate file path
      const fileName = `${userId}/${mealId}/${Date.now()}.jpg`;

      // Upload to Supabase Storage
      const { data, error } = await supabase.storage
        .from(this.BUCKET_NAME)
        .upload(fileName, arrayBuffer, {
          contentType: 'image/jpeg',
          upsert: false,
        });

      if (error) throw error;

      // Get public URL
      const { data: urlData } = supabase.storage
        .from(this.BUCKET_NAME)
        .getPublicUrl(fileName);

      return urlData.publicUrl;
    } catch (error) {
      console.error('Error uploading image:', error);
      throw new Error('Failed to upload image');
    }
  }

  /**
   * Upload a thumbnail to Supabase Storage
   */
  static async uploadThumbnail(
    uri: string,
    userId: string,
    mealId: string
  ): Promise<string> {
    try {
      const base64 = await FileSystem.readAsStringAsync(uri, {
        encoding: FileSystem.EncodingType.Base64,
      });

      const arrayBuffer = decode(base64);
      const fileName = `${userId}/${mealId}/${Date.now()}_thumb.jpg`;

      const { data, error } = await supabase.storage
        .from(this.THUMBNAIL_BUCKET_NAME)
        .upload(fileName, arrayBuffer, {
          contentType: 'image/jpeg',
          upsert: false,
        });

      if (error) throw error;

      const { data: urlData } = supabase.storage
        .from(this.THUMBNAIL_BUCKET_NAME)
        .getPublicUrl(fileName);

      return urlData.publicUrl;
    } catch (error) {
      console.error('Error uploading thumbnail:', error);
      throw new Error('Failed to upload thumbnail');
    }
  }

  /**
   * Delete an image from Supabase Storage
   */
  static async deleteImage(imageUrl: string): Promise<void> {
    try {
      // Extract file path from URL
      const url = new URL(imageUrl);
      const pathParts = url.pathname.split('/');
      const fileName = pathParts.slice(-3).join('/'); // userId/mealId/filename.jpg

      const { error } = await supabase.storage
        .from(this.BUCKET_NAME)
        .remove([fileName]);

      if (error) throw error;
    } catch (error) {
      console.error('Error deleting image:', error);
      throw new Error('Failed to delete image');
    }
  }

  /**
   * Delete a thumbnail from Supabase Storage
   */
  static async deleteThumbnail(thumbnailUrl: string): Promise<void> {
    try {
      const url = new URL(thumbnailUrl);
      const pathParts = url.pathname.split('/');
      const fileName = pathParts.slice(-3).join('/');

      const { error } = await supabase.storage
        .from(this.THUMBNAIL_BUCKET_NAME)
        .remove([fileName]);

      if (error) throw error;
    } catch (error) {
      console.error('Error deleting thumbnail:', error);
      throw new Error('Failed to delete thumbnail');
    }
  }
}

