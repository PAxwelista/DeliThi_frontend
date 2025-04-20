import { useCallback, useEffect, useState } from "react";

export function useFetch(url: string) {
    const [data, setData] = useState<any>();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");
    const [trigger ,setTrigger]  = useState<number>(0)


    const refresh = useCallback(() => {
        setTrigger((prev) => prev + 1);
      }, []);

    useEffect(() => {
        (async () => {
            setIsLoading(true);
            try {
                const response = await fetch(url);
                const json = await response.json();
                setData(json);
            } catch (err: any) {
                setError(err.message || "Erreur inconnue");
            } finally {
                setIsLoading(false);
            }
        })();

    } , [url , trigger]);

    return { data, isLoading, error ,refresh};
}
