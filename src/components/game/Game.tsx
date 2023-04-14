import { List } from 'phosphor-react';
import styles from './Game.module.css';
import ChatBubble from './chatbubble/ChatBubble';
import Textbox from './textbox/Textbox';
import { useContext } from 'react';
import { MessageContext } from '../../contexts/MessageContext';
import Guess from './guess/Guess';


export default function Game() {

    const {messages, setMessages} = useContext(MessageContext);

    return (
        <div className={styles.grid_container}>
            <div className={styles.sidechat}>
                <p>Palpites</p>
                <div className={styles.line}></div>
                
                <div className={styles.guesses}>
                    <Guess name='Norway' distance='9260' direction='Southwest'/>    
                </div>
                <Textbox placeholderText='Dê seu palpite'/>
                
            </div>
            <div className={styles.mainchat}>
                <p>Converse com o BrainIAc para descobrir o país</p>
                <div className={styles.line}></div>

                <div className={styles.chat}>
                    {messages.map (message => {
                        console.log(message.content);
                        return (
                            <ChatBubble content={message.content} isUserMessage={message.isUserMessage}/>
                        )
                    })

                    }
                </div>

                <div className={styles.textbox}>
                    <Textbox placeholderText='Faça uma pergunta'/>
                </div>
                
            </div>
            
        </div>
    )
}