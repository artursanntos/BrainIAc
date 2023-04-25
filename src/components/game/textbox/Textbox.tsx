import styles from './Textbox.module.css';
import { FiSend } from "react-icons/fi";
import { useState, useContext } from 'react';
import { MessageContext } from '../../../contexts/MessageContext';



export default function Textbox({ placeholderText = '' }) {

    const { messages, setMessages, askGpt } = useContext(MessageContext);


    const [newMessageText, setNewMessageText] = useState('');

    /* This function adds the new message written to the list of messages and
    erases the content in the text box */
    const handleCreateNewMessage = async (e: React.FormEvent<HTMLFormElement>) => {

        if (newMessageText.trim().length != 0) {
            e.preventDefault();
            setMessages([...messages, { content: newMessageText, isUserMessage: true, isProcessing: false }]);
            setNewMessageText('');
            await askGpt(newMessageText);
        }
        e.preventDefault();

    }
    /* This function gets the value written on the input */
    const handleNewMessageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewMessageText(e.currentTarget.value);
    }

    /* This variable checks whether the content on the input box is empty */
    //const isNewMessageEmpty = newMessageText.length == 0;

    return (

        <form onSubmit={handleCreateNewMessage} className={styles.textfield}>
            <input
                type="text"
                placeholder={placeholderText}
                value={newMessageText}
                onChange={handleNewMessageChange} />
            <button className={styles.sendButton} type='submit'><FiSend /></button>
        </form>

    )
}