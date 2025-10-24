import { useCallback, useEffect, useState } from "react";
import { useFetchWithAuth } from "./useFetchWithAuth";
import { useAppSelector } from "./redux";
import demoModeData from "../data/demoData.json";

export function useFetch(url: string) {
    const fetchWithAuth = useFetchWithAuth();
    const [data, setData] = useState<any>();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");
    const [trigger, setTrigger] = useState<number>(0);

    const demoMode = useAppSelector(state => state.demoMode);
    const refresh = useCallback(() => {
        setTrigger(prev => prev + 1);
    }, []);

    useEffect(() => {
        (async () => {
            setIsLoading(true);
            setError("")
            try {
                if (demoMode.value) {
                    const route = url
                        .split("/")
                        .filter(v => v)
                        .reverse()[0];
                    if (route in demoModeData) {
                        const data = demoModeData[route as keyof typeof demoModeData];
                        setData({ result: true, [route]: data });
                    } else {
                        setData({ result: false, error: "Problem with demoModeData" });
                    }
                } else {
                    const response = await fetchWithAuth(url);
                    if (response.status === 304) return;

                    const json = await response.json();

                    setData(json);
                    if (!json.result) {
                        setError(json.error);
                    }
                }
            } catch (err: any) {
                setError(err.message || "Erreur inconnue");
            } finally {
                setIsLoading(false);
            }
        })();
    }, [url, trigger]);

    return { data, isLoading, error, refresh };
}
