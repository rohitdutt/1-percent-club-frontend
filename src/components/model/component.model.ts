import { ReactNode } from "react";

export interface CardsProps {
    title: string;
    count: any;
}

export interface AuthContextProps {
    token: string | null;
    setToken: React.Dispatch<React.SetStateAction<string | null>>;
    loading: boolean;
}

export interface AuthProviderProps {
    children: ReactNode;
}