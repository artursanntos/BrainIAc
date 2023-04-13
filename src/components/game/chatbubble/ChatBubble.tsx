import styles from './ChatBubble.module.css';


export default function ChatBubble({content = '', isUserMessage = true}) {

    return (

        <div className={isUserMessage ? styles.userContainer : styles.chatContainer}>
            <div className={isUserMessage ? styles.UserMessage : styles.ChatMessage}>
                {content}
            </div>
        </div>
    )
}