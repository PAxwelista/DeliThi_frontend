import * as SecureStore from "expo-secure-store";

const saveSecureStore = async (key: string, value: string) => {
    await SecureStore.setItemAsync(key, value);
};

const getValueSecureStore = async (key: string): Promise<string> => {
    let result = await SecureStore.getItemAsync(key);
    if (result) {
        return result;
    } else {
        return "No values stored under that key.";
    }
};

export { saveSecureStore, getValueSecureStore };
