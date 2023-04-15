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
    countries: string[]
    guesses: string[]
    setGuesses: Dispatch<SetStateAction<string[]>>
    country: string
    setCountry: Dispatch<SetStateAction<string>>
}

interface MessageProviderProps {
    children: ReactNode
}

export const MessageContext = createContext({} as MessageContextType);

export function MessageContextProvider({ children }: MessageProviderProps) {

    const solution = 'Chile'

    const countries = ['Aland Islands', 'Afghanistan', 'Albania', 'Algeria', 'American Samoa', 'Andorra', 'Angola', 'Anguilla', 'Antarctica', 'Antigua And Barbuda', 'Argentina', 'Armenia', 'Aruba', 'Australia', 'Austria', 'Azerbaijan', 'Bahamas', 'Bahrain', 'Bangladesh', 'Barbados', 'Belarus', 'Belgium', 'Belize', 'Benin', 'Bermuda', 'Bhutan', 'Bolivia', 'Bosnia And Herzegovina', 'Botswana', 'Bouvet Island', 'Brazil', 'British Indian Ocean Territory', 'Brunei Darussalam', 'Bulgaria', 'Burkina Faso', 'Burundi', 'Cambodia', 'Cameroon', 'Canada', 'Cape Verde', 'Cayman Islands', 'Central African Republic', 'Chad', 'Chile', 'China', 'Christmas Island', 'Cocos (Keeling) Islands', 'Colombia', 'Comoros', 'Congo', 'Congo, Democratic Republic', 'Cook Islands', 'Costa Rica', 'Cote D"Ivoire', 'Croatia', 'Cuba', 'Cyprus', 'Czech Republic', 'Denmark', 'Djibouti', 'Dominica', 'Dominican Republic', 'Ecuador', 'Egypt', 'El Salvador', 'Equatorial Guinea', 'Eritrea', 'Estonia', 'Ethiopia', 'Falkland Islands (Malvinas)', 'Faroe Islands', 'Fiji', 'Finland', 'France', 'French Guiana', 'French Polynesia', 'French Southern Territories', 'Gabon', 'Gambia', 'Georgia', 'Germany', 'Ghana', 'Gibraltar', 'Greece', 'Greenland', 'Grenada', 'Guadeloupe', 'Guam', 'Guatemala', 'Guernsey', 'Guinea', 'Guinea-Bissau', 'Guyana', 'Haiti', 'Heard Island & Mcdonald Islands', 'Holy See (Vatican City State)', 'Honduras', 'Hong Kong', 'Hungary', 'Iceland', 'India', 'Indonesia', 'Iran, Islamic Republic Of', 'Iraq', 'Ireland', 'Isle Of Man', 'Israel', 'Italy', 'Jamaica', 'Japan', 'Jersey', 'Jordan', 'Kazakhstan', 'Kenya', 'Kiribati', 'Korea', 'North Korea', 'Kuwait', 'Kyrgyzstan', 'Lao People"s Democratic Republic', 'Latvia', 'Lebanon', 'Lesotho', 'Liberia', 'Libyan Arab Jamahiriya', 'Liechtenstein', 'Lithuania', 'Luxembourg', 'Macao', 'Macedonia', 'Madagascar', 'Malawi', 'Malaysia', 'Maldives', 'Mali', 'Malta', 'Marshall Islands', 'Martinique', 'Mauritania', 'Mauritius', 'Mayotte', 'Mexico', 'Micronesia, Federated States Of', 'Moldova', 'Monaco', 'Mongolia', 'Montenegro', 'Montserrat', 'Morocco', 'Mozambique', 'Myanmar', 'Namibia', 'Nauru', 'Nepal', 'Netherlands', 'Netherlands Antilles', 'New Caledonia', 'New Zealand', 'Nicaragua', 'Niger', 'Nigeria', 'Niue', 'Norfolk Island', 'Northern Mariana Islands', 'Norway', 'Oman', 'Pakistan', 'Palau', 'Palestinian Territory, Occupied', 'Panama', 'Papua New Guinea', 'Paraguay', 'Peru', 'Philippines', 'Pitcairn', 'Poland', 'Portugal', 'Puerto Rico', 'Qatar', 'Reunion', 'Romania', 'Russian Federation', 'Rwanda', 'Saint Barthelemy', 'Saint Helena', 'Saint Kitts And Nevis', 'Saint Lucia', 'Saint Martin', 'Saint Pierre And Miquelon', 'Saint Vincent And Grenadines', 'Samoa', 'San Marino', 'Sao Tome And Principe', 'Saudi Arabia', 'Senegal', 'Serbia', 'Seychelles', 'Sierra Leone', 'Singapore', 'Slovakia', 'Slovenia', 'Solomon Islands', 'Somalia', 'South Africa', 'South Georgia And Sandwich Isl.', 'Spain', 'Sri Lanka', 'Sudan', 'Suriname', 'Svalbard And Jan Mayen', 'Swaziland', 'Sweden', 'Switzerland', 'Syrian Arab Republic', 'Taiwan', 'Tajikistan', 'Tanzania', 'Thailand', 'Timor-Leste', 'Togo', 'Tokelau', 'Tonga', 'Trinidad And Tobago', 'Tunisia', 'Turkey', 'Turkmenistan', 'Turks And Caicos Islands', 'Tuvalu', 'Uganda', 'Ukraine', 'United Arab Emirates', 'United Kingdom', 'United States', 'United States Outlying Islands', 'Uruguay', 'Uzbekistan', 'Vanuatu', 'Venezuela', 'Vietnam', 'Virgin Islands, British', 'Virgin Islands, U.S.', 'Wallis And Futuna', 'Western Sahara', 'Yemen', 'Zambia', 'Zimbabwe'];

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
    
    const [messages, setMessages] = useState<Messages[]>([
        { content : "Hi, I've already thought of a country. You can ask me up to 10 questions.", isUserMessage: false }
    ]);

    const [country, setCountry] = useState('');

    const [guesses, setGuesses] = useState<string[]>([]);

    return (
        <MessageContext.Provider value={{messages, setMessages, askGpt, guesses, setGuesses, countries, country, setCountry}}>
            {children}
        </MessageContext.Provider>
    )
}

