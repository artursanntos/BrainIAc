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

    const countries = ['Aland Islands', 'Afghanistan', 'Albania', 'Algeria', 'American Samoa', 'Andorra', 'Angola', 'Anguilla', 'Antarctica', 'Antigua And Barbuda', 'Argentina', 'Armenia', 'Aruba', 'Australia', 'Austria', 'Azerbaijan', 'Bahamas', 'Bahrain', 'Bangladesh', 'Barbados', 'Belarus', 'Belgium', 'Belize', 'Benin', 'Bermuda', 'Bhutan', 'Bolivia', 'Bosnia And Herzegovina', 'Botswana', 'Bouvet Island', 'Brazil', 'British Indian Ocean Territory', 'Brunei Darussalam', 'Bulgaria', 'Burkina Faso', 'Burundi', 'Cambodia', 'Cameroon', 'Canada', 'Cape Verde', 'Cayman Islands', 'Central African Republic', 'Chad', 'Chile', 'China', 'Christmas Island', 'Cocos (Keeling) Islands', 'Colombia', 'Comoros', 'Congo', 'Congo, Democratic Republic', 'Cook Islands', 'Costa Rica', 'Cote D"Ivoire', 'Croatia', 'Cuba', 'Cyprus', 'Czech Republic', 'Denmark', 'Djibouti', 'Dominica', 'Dominican Republic', 'Ecuador', 'Egypt', 'El Salvador', 'Equatorial Guinea', 'Eritrea', 'Estonia', 'Ethiopia', 'Falkland Islands (Malvinas)', 'Faroe Islands', 'Fiji', 'Finland', 'France', 'French Guiana', 'French Polynesia', 'French Southern Territories', 'Gabon', 'Gambia', 'Georgia', 'Germany', 'Ghana', 'Gibraltar', 'Greece', 'Greenland', 'Grenada', 'Guadeloupe', 'Guam', 'Guatemala', 'Guernsey', 'Guinea', 'Guinea-Bissau', 'Guyana', 'Haiti', 'Heard Island & Mcdonald Islands', 'Holy See (Vatican City State)', 'Honduras', 'Hong Kong', 'Hungary', 'Iceland', 'India', 'Indonesia', 'Iran, Islamic Republic Of', 'Iraq', 'Ireland', 'Isle Of Man', 'Israel', 'Italy', 'Jamaica', 'Japan', 'Jersey', 'Jordan', 'Kazakhstan', 'Kenya', 'Kiribati', 'Korea', 'North Korea', 'Kuwait', 'Kyrgyzstan', 'Lao People"s Democratic Republic', 'Latvia', 'Lebanon', 'Lesotho', 'Liberia', 'Libyan Arab Jamahiriya', 'Liechtenstein', 'Lithuania', 'Luxembourg', 'Macao', 'Macedonia', 'Madagascar', 'Malawi', 'Malaysia', 'Maldives', 'Mali', 'Malta', 'Marshall Islands', 'Martinique', 'Mauritania', 'Mauritius', 'Mayotte', 'Mexico', 'Micronesia, Federated States Of', 'Moldova', 'Monaco', 'Mongolia', 'Montenegro', 'Montserrat', 'Morocco', 'Mozambique', 'Myanmar', 'Namibia', 'Nauru', 'Nepal', 'Netherlands', 'Netherlands Antilles', 'New Caledonia', 'New Zealand', 'Nicaragua', 'Niger', 'Nigeria', 'Niue', 'Norfolk Island', 'Northern Mariana Islands', 'Norway', 'Oman', 'Pakistan', 'Palau', 'Palestinian Territory, Occupied', 'Panama', 'Papua New Guinea', 'Paraguay', 'Peru', 'Philippines', 'Pitcairn', 'Poland', 'Portugal', 'Puerto Rico', 'Qatar', 'Reunion', 'Romania', 'Russian Federation', 'Rwanda', 'Saint Barthelemy', 'Saint Helena', 'Saint Kitts And Nevis', 'Saint Lucia', 'Saint Martin', 'Saint Pierre And Miquelon', 'Saint Vincent And Grenadines', 'Samoa', 'San Marino', 'Sao Tome And Principe', 'Saudi Arabia', 'Senegal', 'Serbia', 'Seychelles', 'Sierra Leone', 'Singapore', 'Slovakia', 'Slovenia', 'Solomon Islands', 'Somalia', 'South Africa', 'South Georgia And Sandwich Isl.', 'Spain', 'Sri Lanka', 'Sudan', 'Suriname', 'Swaziland', 'Sweden', 'Switzerland', 'Syrian Arab Republic', 'Taiwan', 'Tajikistan', 'Tanzania', 'Thailand', 'Timor-Leste', 'Togo', 'Tokelau', 'Tonga', 'Trinidad And Tobago', 'Tunisia', 'Turkey', 'Turkmenistan', 'Turks And Caicos Islands', 'Tuvalu', 'Uganda', 'Ukraine', 'United Arab Emirates', 'United Kingdom', 'United States', 'United States Outlying Islands', 'Uruguay', 'Uzbekistan', 'Vanuatu', 'Venezuela', 'Vietnam', 'Virgin Islands, British', 'Virgin Islands, U.S.', 'Wallis And Futuna', 'Western Sahara', 'Yemen', 'Zambia', 'Zimbabwe'];

    const randomIndex = Math.floor(Math.random() * countries.length);

    const [solution, setSolution] = useState(countries[randomIndex]);
    
    const askGpt = async(text: string) => {
        try {
            const apiUrl = 'https://api.openai.com/v1/chat/completions';

            const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer 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`
            };

            const prompt = `I am a highly intelligent question about countries answering bot. If you ask me a question that is rooted in truth, I will give you the answer by sayng only "yes" or "no". If you ask me a question that is nonsense, trickery, or has no clear answer, I will respond with "I can not answer that". I am being asked about ${solution} and if the person guesses that I have ${solution} I must say "well done bastard".`

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
        { content : "Hi, I've already thought of a country. You can ask me up to 10 questions.", isUserMessage: false }
    ]);

    const [guesses, setGuesses] = useState<string[]>([]);

    return (
        <MessageContext.Provider value={{solution, setSolution, messages, setMessages, askGpt, guesses, setGuesses, countries}}>
            {children}
        </MessageContext.Provider>
    )
}

