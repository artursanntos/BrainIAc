import { ReactNode, createContext, useState, Dispatch, SetStateAction, useEffect, useContext } from "react";
import { WinContext } from "./WinContext";
import axios from 'axios';

/* This is the interface of a message.
   Content is the string of the message and
   the bool tells if the message was passed by chatGPT or
   a player*/
interface Messages {
    content: string;
    isUserMessage: boolean;
    isProcessing: boolean;
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
    guessCount: number
    setGuessCount: Dispatch<SetStateAction<number>>
    askGpt: (question: string) => Promise<void>
    getSolution: () => Promise<void>
}

interface MessageProviderProps {
    children: ReactNode
}

export const MessageContext = createContext({} as MessageContextType);

export function MessageContextProvider({ children }: MessageProviderProps) {

    const countries = ['Algeria', 'Angola', 'Argentina', 'Australia', 'Austria', 'Belgium', 'Bolivia', 'Brazil', 'Bulgaria', 'Cameroon', 'Canada', 'Chile', 'China', 'Colombia', 'Costa Rica', 'Croatia', 'Cuba', 'Czech Republic', 'Denmark', 'Ecuador', 'Egypt', 'Finland', 'France', 'Germany', 'Greece', 'Holy See (Vatican City State)', 'Hungary', 'Iceland', 'India', 'Indonesia', 'Iraq', 'Ireland', 'Israel', 'Italy', 'Jamaica', 'Japan', 'Kazakhstan', 'Korea', 'Madagascar', 'Maldives', 'Mexico', 'Morocco', 'New Zealand', 'North Korea', 'Norway', 'Paraguay', 'Peru', 'Philippines', 'Poland', 'Portugal', 'Qatar', 'Russian Federation', 'Saudi Arabia', 'Serbia', 'Singapore', 'South Africa', 'Spain', 'Sweden', 'Switzerland', 'Syrian Arab Republic', 'Turkey', 'United Arab Emirates', 'United Kingdom', 'United States', 'Uruguay', 'Venezuela'];

    const { setWin, setLose } = useContext(WinContext);

    const askGpt = async (question: string) => {
        try {
            const url = 'https://multimidia-backend-5lcnphvxha-uc.a.run.app/api/question/';

            const headers = {
                'Content-type': 'application/json'
            }

            const context = messages.filter((message) => message.isProcessing == false).map((message) => { return { "text": message.content, is_user: message.isUserMessage }; })

            setMessages((oldState) => [...oldState, { content: "", isUserMessage: false, isProcessing: true }]);


            const data = {
                "country": solution,
                "question": question,
                "context": context
            };

            const response = await axios.post(url, data, { headers })

            const answer = response.data.answer;

            setMessages((oldState) => [...oldState.filter((message) => message.isProcessing == false), { content: answer, isUserMessage: false, isProcessing: false }]);



        } catch (error) {
            console.log(error);

        }
    }

    const getSolution = async () => {

        try {
            const apiUrl = 'https://multimidia-backend-5lcnphvxha-uc.a.run.app/api/daily-solution/';

            const dailySolution = await axios.get(apiUrl);


            if (dailySolution.data.solution != localStorage.getItem('answer')) {
                setGuesses([]);
                setMessages([{ content: "Hi, I've already thought of a country! Ask me any Yes or No question.", isUserMessage: false, isProcessing: false }]);
                setWin(false);
                setLose(false);
                setGuessCount(0);
                localStorage.clear();
                localStorage.setItem('answer', dailySolution.data.solution);
            }

            setSolution(dailySolution.data.solution);

        } catch (error) {
            console.log(error);

        }

    }

    const [solution, setSolution] = useState<string>("");

    const [messages, setMessages] = useState<Messages[]>([
        { content: "Hi, I've already thought of a country! Ask me any Yes or No question.", isUserMessage: false, isProcessing: false }
    ]);

    const [guesses, setGuesses] = useState<string[]>([]);

    const [guessCount, setGuessCount] = useState<number>(0);

    useEffect(() => {
        if (messages.length != 1) {
            localStorage.setItem('messages', JSON.stringify(messages))
        }

    }, [messages])

    useEffect(() => {
        if (guesses.length > 0) {
            localStorage.setItem('guesses', JSON.stringify(guesses));
        }

    }, [guesses])

    useEffect(() => {
        if (guessCount > 0) {
            localStorage.setItem('guessCount', JSON.stringify(guessCount))
        }
    }, [guessCount])

    useEffect(() => {

        if (localStorage.getItem('messages') != null) {
            setMessages(JSON.parse(localStorage.getItem('messages')!))
        }

        if (localStorage.getItem('guesses') != null) {
            setGuesses(JSON.parse(localStorage.getItem('guesses')!))
        }

        if (localStorage.getItem('guessCount') != null) {
            setGuessCount(JSON.parse(localStorage.getItem('guessCount')!))
        }

    }, [])

    return (
        <MessageContext.Provider value={{ guessCount, setGuessCount, solution, setSolution, messages, setMessages, guesses, setGuesses, countries, askGpt, getSolution }}>
            {children}
        </MessageContext.Provider>
    )
}

