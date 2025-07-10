import type { TypedUseSelectorHook } from "react-redux";
import { useDispatch, useSelector, useStore } from "react-redux";
import type { AppDispatch, AppStore, RootState } from "../store";

export * from "./useFetch";
export * from "./useFormInput";
export * from "./useInput";
export * from "./useFetchWithGroupId"

export const useAppDispatch = (): AppDispatch => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppStore = (): AppStore => useStore<AppStore>();