import { ReactNode, createContext, useState, Dispatch, SetStateAction } from "react";
import axios from 'axios';

/* This is the interface of a message.
   Content is the string of the message and
   the bool tells if the message was passed by chatGPT or
   a player*/
interface Messages {
    content: string;
    isUserMessage: boolean;
}

/* This represents the type of context, which is the state i want to hold*/
interface MessageContextType {
    messages: Messages[]
    setMessages: Dispatch<SetStateAction<Messages[]>>
    countries: string[]
    guesses: string[]
    setGuesses: Dispatch<SetStateAction<string[]>>
    solution: string
    setSolution: Dispatch<SetStateAction<string>>
    askGpt: (question: string) => Promise<void>
}

interface MessageProviderProps {
    children: ReactNode
}

export const MessageContext = createContext({} as MessageContextType);

export function MessageContextProvider({ children }: MessageProviderProps) {

    const countries = ['Algeria', 'Angola', 'Argentina', 'Australia', 'Austria', 'Belgium', 'Bolivia', 'Brazil', 'Bulgaria', 'Cameroon', 'Canada', 'Chile', 'China', 'Colombia', 'Costa Rica', 'Croatia', 'Cuba', 'Czech Republic', 'Denmark', 'Ecuador', 'Egypt', 'Finland', 'France', 'Germany', 'Greece', 'Holy See (Vatican City State)', 'Hungary', 'Iceland', 'India', 'Indonesia', 'Iraq', 'Ireland', 'Israel', 'Italy', 'Jamaica', 'Japan', 'Kazakhstan', 'Korea', 'Madagascar', 'Maldives', 'Mexico', 'Morocco', 'New Zealand', 'North Korea', 'Norway', 'Paraguay', 'Peru', 'Philippines', 'Poland', 'Portugal', 'Qatar', 'Russian Federation', 'Saudi Arabia', 'Serbia', 'Singapore', 'South Africa', 'Spain', 'Sweden', 'Switzerland', 'Syrian Arab Republic', 'Turkey', 'United Arab Emirates', 'United Kingdom', 'United States', 'Uruguay', 'Venezuela'];

    const randomIndex = Math.floor(Math.random() * countries.length);

    const [solution, setSolution] = useState(countries[randomIndex]);
    
    const askGpt = async(question: string) => {
        try {
            const url = 'https://multimidia-backend-5lcnphvxha-uc.a.run.app/api/question/';

            const headers = {
                'Content-type': 'application/json'
            }

            const data = {
                "country": solution,
                "question": question
            };

            const response = await axios.post(url, data, { headers })
            
            const answer = response.data.answer;
            
            setMessages((oldState) => [...oldState, {content: answer, isUserMessage: false}]);
            

        } catch (error) {
            console.log(error);
            
        }
    }
    
    const [messages, setMessages] = useState<Messages[]>([
        { content : "Hi, I've already thought of a country! Ask me any Yes or No question.", isUserMessage: false }
    ]);

    const [guesses, setGuesses] = useState<string[]>([]);

    return (
        <MessageContext.Provider value={{solution, setSolution, messages, setMessages, guesses, setGuesses, countries, askGpt}}>
            {children}
        </MessageContext.Provider>
    )
}

