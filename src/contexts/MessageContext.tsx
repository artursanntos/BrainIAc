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
    askGpt: (text: string) => Promise<void>
    countries: string[]
    guesses: string[]
    setGuesses: Dispatch<SetStateAction<string[]>>
    solution: string
    setSolution: Dispatch<SetStateAction<string>>
}

interface MessageProviderProps {
    children: ReactNode
}

export const MessageContext = createContext({} as MessageContextType);

export function MessageContextProvider({ children }: MessageProviderProps) {

    const countries = ['Algeria', 'Angola', 'Argentina', 'Australia', 'Austria', 'Belgium', 'Bolivia', 'Brazil', 'Bulgaria', 'Cameroon', 'Canada', 'Chile', 'China', 'Colombia', 'Costa Rica', 'Croatia', 'Cuba', 'Czech Republic', 'Denmark', 'Ecuador', 'Egypt', 'Finland', 'France', 'Germany', 'Greece', 'Holy See (Vatican City State)', 'Hungary', 'Iceland', 'India', 'Indonesia', 'Iraq', 'Ireland', 'Israel', 'Italy', 'Jamaica', 'Japan', 'Kazakhstan', 'Korea', 'Madagascar', 'Maldives', 'Mexico', 'Morocco', 'New Zealand', 'North Korea', 'Norway', 'Paraguay', 'Peru', 'Philippines', 'Poland', 'Portugal', 'Qatar', 'Russian Federation', 'Saudi Arabia', 'Serbia', 'Singapore', 'South Africa', 'Spain', 'Sweden', 'Switzerland', 'Syrian Arab Republic', 'Turkey', 'United Arab Emirates', 'United Kingdom', 'United States', 'Uruguay', 'Venezuela'];

    const randomIndex = Math.floor(Math.random() * countries.length);

    const [solution, setSolution] = useState(countries[randomIndex]);
    
    const askGpt = async(text: string) => {
        try {
            const apiUrl = 'https://api.openai.com/v1/chat/completions';

            const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer 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`
            };

            const prompt = `I am a highly intelligent question answering bot. I know everything about all countries in the world precisely. If you ask me a question that is rooted in truth, I will give you the answer by saying only "yes" or "no" and I am never saying ${solution}. If you ask me a question that is nonsense, trickery, or has no clear answer, I will respond with "I can not answer that". I am being asked yes or no questions about ${solution}`

            const question = `My first question is: ${text}`

            const data = {
                model: 'gpt-3.5-turbo-0301',
                messages: [{"role": "user", "content": prompt}, {"role": "assistant", "content": "Ok, understood."}, {"role": "user", "content": question}],
                temperature: 0.0,
                max_tokens: 50
              };

            const response = await axios.post(apiUrl, data, { headers })

            const answer = response.data.choices[0].message.content
            
            setMessages((oldState) => [...oldState, {content: answer, isUserMessage: false}]);
            
        } catch (error) {
            console.log(error)
        }
    }
    
    const [messages, setMessages] = useState<Messages[]>([
        { content : "Hi, I've already thought of a country! Ask me any Yes or No question.", isUserMessage: false }
    ]);

    const [guesses, setGuesses] = useState<string[]>([]);

    return (
        <MessageContext.Provider value={{solution, setSolution, messages, setMessages, askGpt, guesses, setGuesses, countries}}>
            {children}
        </MessageContext.Provider>
    )
}

