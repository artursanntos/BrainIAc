import { ReactNode, createContext, useContext, useState, Dispatch, SetStateAction } from "react";

interface Messages {
    content: string
    userMessage: boolean
}

interface MessageContextType {
    //messages: Messages[] Fazer depois para diferenciar mensagens do chatGPT e jogadores
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

