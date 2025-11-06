// Environment configuration
export const ENV = {
  // Supabase
  SUPABASE_URL: process.env.EXPO_PUBLIC_SUPABASE_URL || '',
  SUPABASE_ANON_KEY: process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || '',
  
  // DeepSeek AI
  DEEPSEEK_API_KEY: process.env.EXPO_PUBLIC_DEEPSEEK_API_KEY || '',
  DEEPSEEK_API_URL: process.env.EXPO_PUBLIC_DEEPSEEK_API_URL || 'https://api.deepseek.com/v1',
  
  // App
  APP_ENV: process.env.EXPO_PUBLIC_APP_ENV || 'development',
  API_TIMEOUT: parseInt(process.env.EXPO_PUBLIC_API_TIMEOUT || '30000', 10),
  
  // Image Processing
  MAX_IMAGE_SIZE: parseInt(process.env.EXPO_PUBLIC_MAX_IMAGE_SIZE || '1024', 10),
  IMAGE_QUALITY: parseFloat(process.env.EXPO_PUBLIC_IMAGE_QUALITY || '0.7'),
};

// Validate required environment variables
export const validateEnv = () => {
  const required = [
    'SUPABASE_URL',
    'SUPABASE_ANON_KEY',
  ];
  
  const missing = required.filter(key => !ENV[key as keyof typeof ENV]);
  
  if (missing.length > 0) {
    console.warn(`Missing required environment variables: ${missing.join(', ')}`);
    return false;
  }
  
  return true;
};

