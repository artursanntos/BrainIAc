import { List } from 'phosphor-react';
import styles from './Game.module.css';
import ChatBubble from './chatbubble/ChatBubble';
import Textbox from './textbox/Textbox';
import { useContext } from 'react';
import { MessageContext } from '../../contexts/MessageContext';
import Guess from './guess/Guess';
import Guessbox from './guessbox/Guessbox';
import { WinContext } from '../../contexts/WinContext';


export default function Game() {

    const {messages, guesses, solution} = useContext(MessageContext);

    return (
        <div className={styles.grid_container}>
            <div className={styles.sidechat}>
                <p>Guesses</p>
                <div className={styles.line}></div>
                
                <div className={styles.guesses}>
                    {guesses.map(guess => {
                        return (
                            <Guess name={guess} distance='9260' direction='Southeast'/>
                        )
                    })}
                        
                </div>
                <Guessbox/>
                
            </div>
            <div className={styles.mainchat}>
                <p>Talk to BrainIAc to discover the country!</p>
                <div className={styles.line}></div>

                <div className={styles.chat}>
                    {messages.map (message => {
                        // console.log(message.content);
                        return (
                            <ChatBubble content={message.content} isUserMessage={message.isUserMessage}/>
                        )
                    })

                    }
                </div>

                <div className={styles.textbox}>
                    <Textbox placeholderText='Ask a yes or no question'/>
                </div>
                
            </div>
            
        </div>
    )
}