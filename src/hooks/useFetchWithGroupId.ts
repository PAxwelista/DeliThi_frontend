import { useAppSelector } from "./redux";

export const useFetchWithGroupId = () => {
    const groupId = useAppSelector(state => state.login.groupId);
  
    const fetchWithGroup = async (url: string, options = {}) => {
      const headers = {
        "group-Id": groupId,
      };
  
      const finalOptions = {
        ...options,
        headers,
      };
  
      return fetch(url, finalOptions);
    };
  
    return fetchWithGroup;
  };