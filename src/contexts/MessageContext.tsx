import { ReactNode, createContext, useContext, useState, Dispatch, SetStateAction } from "react";
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
    guessCountry: (text: string) => Promise<void>
}

interface MessageProviderProps {
    children: ReactNode
}

export const MessageContext = createContext({} as MessageContextType);

export function MessageContextProvider({ children }: MessageProviderProps) {

    const solution = 'Chile'

    const askGpt = async(text: string) => {
        try {
            const apiUrl = 'https://api.openai.com/v1/chat/completions';

            const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer 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`
            };

            const prompt = `We are playing a game and I am going to tell you the rules that you MUST follow. You got the country ${solution} but I don't know that you got this country. Now I am asking you questions about the country you got and you must answer with YES or NO and only YES or NO. If I ask you a question that is not possible to answer with YES or NO you have to tell me that I can only ask YES or NO questions. You can not tell me the country you got until I got it right and when I correctly guess the country you return the message Congratulations mah friend! Remember you can't say anything different from YES OR NO until I get it right.`

            const question = `My first question is: ${text}`

            const data = {
                model: 'gpt-3.5-turbo-0301',
                messages: [{"role": "user", "content": prompt}, {"role": "assistant", "content": "Ok, understood."}, {"role": "user", "content": question}],
                temperature: 0.2,
                max_tokens: 50
              };

            const response = await axios.post(apiUrl, data, { headers })

            const answer = response.data.choices[0].message.content
            
            setMessages((oldState) => [...oldState, {content: answer, isUserMessage: false}]);
            
        } catch (error) {
            console.log(error)
        }
    }

    const guessCountry = async(text: string) => {
        try {
            const apiUrl = 'https://api.openai.com/v1/chat/completions';

            const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer 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`
            };
            
            const prompt = `We are playing a game and I am going to tell you the rules that you MUST follow. You got the country ${solution} but I don't know that you got this country. Now I am guessing the country you got and you must answer with YES or NO and only YES or NO. If I ask you a question that is not possible to answer with YES or NO you have to tell me that I can only ask YES or NO questions. You can not tell me the country you got until I got it right and when I correctly guess the country you return the message Congratulations mah friend! Remember you can't say anything different from YES OR NO until I get it right. My first question is: ${text}`

            const data = {
                model: 'gpt-3.5-turbo-0301',
                messages: [{"role": "user", "content": prompt}],
                temperature: 0.7,
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
        { content : 'Oi, já pensei em um país. Você pode me fazer até 10 perguntas', isUserMessage: false }
    ]);

    return (
        <MessageContext.Provider value={{messages, setMessages, askGpt, guessCountry}}>
            {children}
        </MessageContext.Provider>
    )
}

