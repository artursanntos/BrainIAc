import styles from './ChatBubble.module.css';
import { ThreeDots } from 'react-loader-spinner';


export default function ChatBubble({ content = '', isUserMessage = true, isProcessing = false }) {
    return (
        <div className={isUserMessage ? styles.userContainer : styles.chatContainer}>
            <div className={isUserMessage ? styles.UserMessage : styles.ChatMessage}>
                {isProcessing ? <ThreeDots color="#ffffff" height={20} width={20} /> : content}
            </div>
        </div>
    )
}