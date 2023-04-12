import { List } from 'phosphor-react';
import styles from './Game.module.css';
import ChatBubble from './chatbubble/ChatBubble';
import Textbox from './textbox/Textbox';
import { useContext } from 'react';
import { MessageContext } from '../../contexts/MessageContext';


export default function Game() {

    const {messages, setMessages} = useContext(MessageContext);

    return (
        <div className={styles.grid_container}>
            <div className={styles.sidechat}>
                <p>Palpites</p>
                <div className={styles.line}></div>
                <Textbox placeholderText='Dê seu palpite'/>
            </div>
            <div className={styles.mainchat}>
                <p>Converse com o BrainIAc para descobrir o país</p>
                <div className={styles.line}></div>

                <div className={styles.chat}>
                    {messages.map (message => {
                        return (
                            <ChatBubble content={message}/>
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