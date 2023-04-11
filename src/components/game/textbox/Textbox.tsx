import styles from './Textbox.module.css';
import { FiSend } from "react-icons/fi";
import { useState } from 'react';



export default function Textbox({placeholderText = ''}) {

    const [messages, setMessages] = useState(['']);

    const [newMessageText, setNewMessageText] = useState('');

    /* This function adds the new message written to the list of messages and
    erases the content in the text box */
    function handleCreateNewMessage(e: React.FormEvent<HTMLFormElement>) {
        
        e.preventDefault();
        setMessages([...messages, newMessageText]);
        setNewMessageText('');
        console.log(messages);
    }
    /* This function gets the value written on the input */
    function handleNewMessageChange(e: React.ChangeEvent<HTMLInputElement>) {

        e.currentTarget.setCustomValidity('');
        setNewMessageText(e.currentTarget.value);
    }

    /* This variable checks whether the content on the input box is empty */
    const isNewMessageEmpty = newMessageText.length == 0;

    return (

        <form onSubmit={handleCreateNewMessage} className={styles.textfield}>
            <input
                type="text"
                placeholder={placeholderText}
                value={newMessageText}
                onChange={handleNewMessageChange}/>
            <button type='submit'><FiSend/></button>
        </form>

    )
}