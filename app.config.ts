import { ExpoConfig, ConfigContext } from "@expo/config";

export default ({ config }: ConfigContext): ExpoConfig => ({
    ...config,
    name: "DeliThi",
    slug: "project_ferme_frontend",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    userInterfaceStyle: "light",
    newArchEnabled: true,
    splash: {
        image: "./assets/splash-icon.png",
        resizeMode: "contain",
        backgroundColor: "#ffffff",
    },
    assetBundlePatterns: ["./assets/fonts/*"],
    ios: {
        supportsTablet: true,
        bundleIdentifier: "com.paxwel.Delithi",
        userInterfaceStyle: "light",
        infoPlist: {
            ITSAppUsesNonExemptEncryption: false,
        },
        config: {
            googleMapsApiKey: process.env.EXPO_PUBLIC_GOOGLE_MAPS_IOS_API_KEY,
        },
    },
    android: {
        adaptiveIcon: {
            foregroundImage: "./assets/adaptive-icon.png",
            backgroundColor: "#ffffff",
        },
        userInterfaceStyle: "light",
        package: "com.paxwel.Delithi",
        config: {
            googleMaps: {
                apiKey: process.env.EXPO_PUBLIC_GOOGLE_MAPS_ANDROID_API_KEY,
            },
        },
    },
    web: {
        favicon: "./assets/favicon.png",
    },
    extra: {
        eas: {
            projectId: "e0fa60d0-8253-4913-ba10-c8155906ddbd",
        },
    },
    runtimeVersion: {
        policy: "appVersion",
    },
    updates: {
        url: "https://u.expo.dev/e0fa60d0-8253-4913-ba10-c8155906ddbd",
    },
});
