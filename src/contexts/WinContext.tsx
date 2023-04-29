import { ReactNode, createContext, useState, Dispatch, SetStateAction, useContext, useEffect } from "react";
import { MessageContext } from "./MessageContext";

interface WinContextType {
    // check if the game was won
    win: boolean;
    setWin: Dispatch<SetStateAction<boolean>>;
    // check if win popup modal is opened
    isWinOpen: boolean;
    setIsWinOpen: Dispatch<SetStateAction<boolean>>;
    // check if the game was lost
    lose: boolean;
    setLose: Dispatch<SetStateAction<boolean>>;
    // check if lose popup is open
    isLoseOpen: boolean;
    setIsLoseOpen: Dispatch<SetStateAction<boolean>>;
}

interface WinProviderProps {
    children: ReactNode;
}


export const WinContext = createContext({} as WinContextType);

export function WinContextProvider({ children }: WinProviderProps) {

    const [win, setWin] = useState<boolean>(false);
    const [isWinOpen, setIsWinOpen] = useState<boolean>(false);
    const [lose, setLose] = useState<boolean>(false);
    const [isLoseOpen, setIsLoseOpen] = useState<boolean>(false);

    useEffect(() => {
        if (win) {
            localStorage.setItem('Win', JSON.stringify(win))
        }
    }, [win])

    useEffect(() => {
        if (lose) {
            localStorage.setItem('Lose', JSON.stringify(lose))
        }
    }, [lose])

    useEffect(() => {
        if (localStorage.getItem('lose') != 'false') {
            setLose(JSON.parse(localStorage.getItem('lose')!))
        }

        if (localStorage.getItem('win') != 'false') {
            setWin(JSON.parse(localStorage.getItem('win')!))
        }

    }, [])


    return (
        <WinContext.Provider value={{ win, setWin, isWinOpen, setIsWinOpen, lose, setLose, isLoseOpen, setIsLoseOpen }}>
            {children}
        </WinContext.Provider>

    )
}
