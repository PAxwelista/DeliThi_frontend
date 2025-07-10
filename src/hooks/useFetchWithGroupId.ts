import { useAppSelector } from "./redux";

export const useFetchWithGroupId = () => {
    const groupId = useAppSelector(state => state.login.groupId);

    const fetchWithGroup = async (url: string, options: RequestInit = {}) => {
        const headers = {
            "group-Id": groupId,
            ...(options.headers || {}),
        };


        const finalOptions = {
            ...options,
            headers,
        };


        return fetch(url, finalOptions);
    };

    return fetchWithGroup;
};
