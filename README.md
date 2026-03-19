# Digital Donor - HopeCardRN

A modern React Native application for Digital Donor.

## 🚀 Getting Started

### Prerequisites
- Node.js >= 22.11.0
- Android Studio & SDK (API 36 recommended for compilation)
- Gradle 8.13

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/HopeCardRN.git
   cd HopeCardRN
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Install Peer Dependencies**
   This project uses Reanimated v4 which requires:
   ```bash
   npm install react-native-worklets
   ```

### Running the App

1. **Start Metro Bundler**
   ```bash
   npx react-native start --port 8082
   ```

2. **Run on Android**
   In a new terminal:
   ```bash
   npx react-native run-android --port 8082
   ```

## 🛠 Project Configuration Details

This project has been optimized with the following specific configurations to resolve common build issues:

- **Gradle Version**: Downgraded to `8.13` (from 9.0) to maintain plugin compatibility.
- **Android SDK**: `compileSdkVersion` set to `36` to support the latest `androidx.core` requirements.
- **Port**: Configured to run on port `8082` by default.
- **Babel**: Configured with `react-native-reanimated/plugin`.

## 📱 Features
- **Image Carousel**: Auto-scrolling image display (currently using placeholders).
- **Authentication**: Login, Sign Up, and Forgot Password flows.
- **Navigation**: Uses `@react-navigation/native-stack`.

## 🔧 Troubleshooting

### "Unable to load script" / Connection Issues
If the app fails to connect to Metro:
1. Open Dev Menu in Emulator (`Ctrl + M`).
2. Go to **Settings** > **Debug server host & port**.
3. Set it to `10.0.2.2:8082`.
4. Reload the app.

### Gradle Build Fails
If you encounter `JvmVendorSpec` errors, ensure you are using Gradle 8.13 as configured in `gradle-wrapper.properties`.

---
Built with ❤️ using React Native.
