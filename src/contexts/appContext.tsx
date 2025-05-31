"use client"
import React from "react";

const AppContext = React.createContext<{
    fetching: boolean;
    setFetching: React.Dispatch<React.SetStateAction<boolean>>;
    tickets: any[];
    setTickets: React.Dispatch<React.SetStateAction<any[]>>;
}>({
    fetching: true,
    setFetching: () => {},
    tickets: [],
    setTickets: () => {},
});

export function AppContextProvider({ children }: { children: React.ReactNode }) {
    const [fetching, setFetching] = React.useState(true);
    const [tickets, setTickets] = React.useState<any[]>([]);

    return (
        <AppContext.Provider value={{
            fetching,
            setFetching,
            tickets,
            setTickets
        }}>
            {children}
        </AppContext.Provider>
    )
}

export function useAppContext() {
    return React.useContext(AppContext);
}