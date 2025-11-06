# Photo Calo AI - Nutrition Counter App

A mobile nutrition tracking app that uses AI to analyze food photos and estimate calories and macronutrients.

## 🌟 Features

- **📸 Camera-First Interface**: Take photos of your meals directly from the app
- **🤖 AI-Powered Analysis**: Uses DeepSeek AI to identify foods and estimate nutrition
- **📊 Nutrition Tracking**: Track calories, protein, carbs, fat, fiber, and sugar
- **📱 Cross-Platform**: Built with React Native and Expo for iOS, Android, and Web
- **☁️ Cloud Backend**: Supabase for authentication, database, and storage
- **📈 Daily Summaries**: Automatic daily nutrition aggregation
- **🎯 Goal Setting**: Set and track your daily nutrition goals

## 🛠️ Tech Stack

- **Frontend**: React Native, Expo, TypeScript
- **UI Library**: React Native Paper
- **Navigation**: Expo Router (file-based routing)
- **State Management**: Zustand
- **Backend**: Supabase (PostgreSQL, Auth, Storage)
- **AI**: DeepSeek API for food recognition
- **Image Processing**: Expo Image Manipulator

## 📋 Prerequisites

- Node.js 18+ and npm
- Expo CLI (`npm install -g expo-cli`)
- Supabase account ([supabase.com](https://supabase.com))
- DeepSeek API key ([deepseek.com](https://deepseek.com))

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd Photo-Calo-AI
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

Edit `.env` and add your credentials:

```env
# Supabase Configuration
EXPO_PUBLIC_SUPABASE_URL=your_supabase_project_url
EXPO_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# DeepSeek AI Configuration
EXPO_PUBLIC_DEEPSEEK_API_KEY=your_deepseek_api_key
EXPO_PUBLIC_DEEPSEEK_API_URL=https://api.deepseek.com/v1

# App Configuration
EXPO_PUBLIC_APP_ENV=development
EXPO_PUBLIC_API_TIMEOUT=30000

# Image Processing Configuration
EXPO_PUBLIC_MAX_IMAGE_SIZE=1024
EXPO_PUBLIC_IMAGE_QUALITY=0.7
```

### 4. Set up Supabase

1. Create a new Supabase project
2. Run the database migrations from `supabase/migrations/`
3. Create two storage buckets:
   - `meal-images` (public)
   - `meal-thumbnails` (public)
4. Enable Row Level Security (RLS) policies as defined in the schema

### 5. Run the app

```bash
# Start the development server
npm start

# Run on iOS
npm run ios

# Run on Android
npm run android

# Run on Web
npm run web
```

## 📁 Project Structure

```
Photo-Calo-AI/
├── app/                    # Expo Router app directory
│   ├── (tabs)/            # Tab navigation screens
│   │   ├── index.tsx      # Camera screen (default)
│   │   ├── history.tsx    # Meal history
│   │   └── profile.tsx    # User profile
│   ├── meal/              # Meal detail screens
│   │   └── [id].tsx       # Dynamic meal detail
│   └── _layout.tsx        # Root layout
├── src/
│   ├── components/        # Reusable UI components
│   │   ├── camera/        # Camera components
│   │   ├── nutrition/     # Nutrition display components
│   │   ├── meal/          # Meal-related components
│   │   └── common/        # Common UI components
│   ├── services/          # API and business logic
│   │   ├── database.service.ts
│   │   ├── storage.service.ts
│   │   └── ai.service.ts
│   ├── hooks/             # Custom React hooks
│   ├── store/             # Zustand state management
│   ├── utils/             # Utility functions
│   ├── types/             # TypeScript type definitions
│   ├── config/            # App configuration
│   └── constants/         # App constants
├── supabase/              # Supabase configuration
│   ├── migrations/        # Database migrations
│   └── functions/         # Edge functions
├── assets/                # Images, fonts, etc.
├── docs/                  # Documentation
│   └── CONTEXT.md         # Detailed app specifications
└── __tests__/             # Test files
```

## 🔑 Key Features Explained

### Camera & Image Processing

- Auto-orientation and resize to 1024px max dimension
- JPEG compression (~70% quality)
- Thumbnail generation (200px)
- Upload to Supabase Storage

### AI Analysis

- DeepSeek AI for food recognition
- Nutrition estimation based on USDA database
- Confidence scoring for each detected food
- JSON-structured response parsing

### Database Schema

- **users**: User profiles and authentication
- **meals**: Meal records with nutrition totals
- **food_items**: Individual foods detected in meals
- **nutrition_database**: Reference nutrition data
- **daily_summaries**: Aggregated daily stats
- **user_goals**: User nutrition targets
- **analysis_logs**: AI processing logs
- **app_analytics**: Usage analytics

## 🧪 Testing

```bash
# Run tests (when implemented)
npm test
```

## 📱 Building for Production

```bash
# Build for iOS
npx eas-cli build --platform ios

# Build for Android
npx eas-cli build --platform android

# Deploy web version
npm run deploy
```

## 📄 License

MIT

## 🤝 Contributing

Contributions are welcome! Please read the contributing guidelines first.

## 📞 Support

For issues and questions, please open an issue on GitHub.
