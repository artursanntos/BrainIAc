import styles from './ChatBubble.module.css';


export default function ChatBubble({content = 'Hello, this isaaaaaaaa', userMessage = true}) {

    return (
        <div className={userMessage ? styles.UserMessage : styles.ChatMessage}>
            {content}
        </div>
    )
}