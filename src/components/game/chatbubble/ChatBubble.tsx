import styles from './ChatBubble.module.css';


export default function ChatBubble({content = 'Hello, this is', userMessage = true}) {

    return (

        <div className={userMessage ? styles.userContainer : styles.chatContainer}>
            <div className={userMessage ? styles.UserMessage : styles.ChatMessage}>
                {content}
            </div>
        </div>
    )
}