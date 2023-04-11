import { ReactNode, createContext, useContext, useState, Dispatch, SetStateAction } from "react";

interface MessageContextType {
    messages: string[]
    setMessages: Dispatch<SetStateAction<string[]>>
}

interface MessageProviderProps {
    children: ReactNode
}

export const MessageContext = createContext({} as MessageContextType);

export function MessageContextProvider({ children }: MessageProviderProps) {
    
    const [messages, setMessages] = useState(['Frej', 'Bom dia', 'frotas', 'fresno', 'fraudes']);

    return (
        <MessageContext.Provider value={{messages, setMessages}}>
            {children}
        </MessageContext.Provider>
    )
}

