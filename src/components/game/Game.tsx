import { List } from 'phosphor-react';
import styles from './Game.module.css';
import ChatBubble from './chatbubble/ChatBubble';
import Textbox from './textbox/Textbox';


export default function Game() {

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
                    <ChatBubble userMessage = { false }/>
                    <ChatBubble content = {'Hello, this is a user Message'} userMessage = { true }/>
                </div>
                

                <Textbox placeholderText='Faça uma pergunta'/>
            </div>
        </div>
    )
}