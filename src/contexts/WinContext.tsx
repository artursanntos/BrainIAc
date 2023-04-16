import { ReactNode, createContext, useState, Dispatch, SetStateAction } from "react";

interface WinContextType {
    win: boolean;
    setWin: Dispatch<SetStateAction<boolean>>;
    isWinOpen: boolean;
    setIsWinOpen: Dispatch<SetStateAction<boolean>>;
}

interface WinProviderProps {
    children: ReactNode;
}

export const WinContext = createContext({} as WinContextType);

export function WinContextProvider({ children }: WinProviderProps) {


    const [win, setWin] = useState<boolean>(false);
    const [isWinOpen, setIsWinOpen] = useState<boolean>(false);


    return (
        <WinContext.Provider value={{ win, setWin, isWinOpen, setIsWinOpen}}>
            {children}
        </WinContext.Provider>

    )
}