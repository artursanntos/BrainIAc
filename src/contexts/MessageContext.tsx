import { ReactNode, createContext, useContext, useState, Dispatch, SetStateAction } from "react";

/* This is the interface of a message.
   Content is the string of the message and
   the bool tells if the message was passed by chatGPT or
   a player*/
interface Messages {
    content: string;
    isUserMessage: boolean;
}

/* This represents the type of context */
interface MessageContextType {
    messages: Messages[]
    setMessages: Dispatch<SetStateAction<Messages[]>>
}

interface MessageProviderProps {
    children: ReactNode
}

export const MessageContext = createContext({} as MessageContextType);

export function MessageContextProvider({ children }: MessageProviderProps) {
    
    const [messages, setMessages] = useState<Messages[]>([
        { content : 'Oi, já pensei em um país. Pergunte-me sobre ele', isUserMessage: false }
    ]);

    return (
        <MessageContext.Provider value={{messages, setMessages}}>
            {children}
        </MessageContext.Provider>
    )
}

