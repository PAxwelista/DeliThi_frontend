import { useAppSelector } from "./redux";


export const useFetchWithAuth = () => {
    const token = useAppSelector(state => state.login.token);


    const fetchWithAuth = async (url: string, options: RequestInit = {}) => {


        const headers = {
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
            ...(options.headers || {}),
        };


        const finalOptions = {
            ...options,
            headers,
        };


        return fetch(url, finalOptions);
    };

    return fetchWithAuth;
};
