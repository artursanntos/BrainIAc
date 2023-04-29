import styles from './Textbox.module.css';
import { FiSend } from "react-icons/fi";
import { useState, useContext, useEffect } from 'react';
import { MessageContext } from '../../../contexts/MessageContext';
import { WinContext } from '../../../contexts/WinContext';



export default function Textbox({ placeholderText = '' }) {

    const {messages, setMessages, askGpt} = useContext(MessageContext);
    const { lose, win } = useContext(WinContext);
    
    // This state controls whether the game has ended or not
    const [endGame, setEndGame] = useState(false);

    const [newMessageText, setNewMessageText] = useState('');

    /* This function adds the new message written to the list of messages and
    erases the content in the text box */
    const handleCreateNewMessage = async (e: React.FormEvent<HTMLFormElement>) => {
        
        if((newMessageText.trim().length != 0) && !lose && !win){
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

    useEffect(() => {
        if (localStorage.getItem('Lose') == 'true' || localStorage.getItem('Win') == 'true' || win || lose) {
            setEndGame(true);
        }
    }, [win, lose])
    

    return (

        <form onSubmit={handleCreateNewMessage} className={styles.textfield}>
            <input
                type="text"
                placeholder={placeholderText}
                value={newMessageText}
                onChange={handleNewMessageChange}
                disabled={endGame}/>
            <button className={styles.sendButton} disabled={endGame} type='submit'><FiSend/></button>
        </form>

    )
}