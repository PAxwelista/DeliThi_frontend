import { useCallback, useEffect, useState } from "react";
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { View } from "react-native";

SplashScreen.preventAutoHideAsync();

type Props = { children: React.ReactNode };

const FontInit = ({ children }: Props) => {
    const [fontsLoaded, setFontsLoaded] = useState(false);

    useEffect(() => {
        Font.loadAsync({
            Sora: require("../../assets/fonts/Sora-Regular.ttf"),
        }).then(() => setFontsLoaded(true));
    }, []);

    const onLayoutRootView = useCallback(async () => {
        if (fontsLoaded) await SplashScreen.hideAsync();
    }, [fontsLoaded]);

    if (!fontsLoaded) return null;

    return (
        <View
            onLayout={onLayoutRootView}
            style={{ flex: 1 }}
        >
            {children}
        </View>
    );
};

export { FontInit };
