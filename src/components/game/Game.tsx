import styles from './Game.module.css';
import ChatBubble from './chatbubble/ChatBubble';
import Textbox from './textbox/Textbox';
import { useContext, useEffect } from 'react';
import { MessageContext } from '../../contexts/MessageContext';
import Guess from './guess/Guess';
import Guessbox from './guessbox/Guessbox';


export default function Game() {

    const {messages, guesses, getSolution, guessCount} = useContext(MessageContext);

    useEffect(() => {
        getSolution();
    }, []);
    
    return (
        <div className={styles.grid_container}>
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
            <div className={styles.sidechat}>
                <div className={styles.placeholder}>
                    <p>Guesses</p>
                    <p className={styles.guessCounter}>{guessCount}/5</p>
                </div>
                
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
        </div>
    )
}