import { useCallback, useEffect, useState } from "react";
import { useFetchWithAuth } from "./useFetchWithAuth";


export function useFetch(url: string) {
    const fetchWithAuth = useFetchWithAuth();
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
                const response = await fetchWithAuth(url);
                const json = await response.json();
                setData(json);
                if (!json.result){
                    setError(json.error)
                }
            } catch (err: any) {
                setError(err.message || "Erreur inconnue");
            } finally {
                setIsLoading(false);
            }
        })();

    } , [url , trigger]);

    return { data, isLoading, error ,refresh};
}