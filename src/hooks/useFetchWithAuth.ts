import { apiUrl } from "../config";
import { disconnect, setAccessToken } from "../reducers/login";
import { getValueSecureStore } from "../utils";
import { useAppSelector, useAppDispatch } from "./redux";

export const useFetchWithAuth = () => {
    let login = useAppSelector(state => state.login);
    let token = login.token;
    console.log(login)
    const dispatch = useAppDispatch();

    const refreshAccessToken = async (): Promise<string> => {
        try {
            const refreshToken = await getValueSecureStore("refreshToken");
            const res = await fetch(`${apiUrl}/refreshToken`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ refreshToken }),
            });

            const data = await res.json();

            if (!data.result) throw new Error("Refresh token invalid");

            dispatch(setAccessToken(data.accessToken));
            return data.accessToken;
        } catch (err) {
            dispatch(disconnect());
            throw err;
        }
    };

    const fetchWithAuth = async (url: string, options: RequestInit = {}) => {

        const fetchWithToken = async (token : string) :Promise<Response> =>{

            const headers = {
                ...(token ? { Authorization: `Bearer ${token}` } : {}),
                ...(options.headers || {}),
            };
    
            const finalOptions = {
                ...options,
                headers,
            };

            return fetch(url, finalOptions);

        }

        let result = await fetchWithToken(token)
        if (result.status === 401) {
            try {
                token = await refreshAccessToken();
                result = await fetchWithToken(token)
            } catch (err) {
                throw new Error("Session expirée");
            }
        }
        return result;
    };

    return fetchWithAuth;
};
