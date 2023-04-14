import styles from './Guessbox.module.css';
import { FiSend } from "react-icons/fi";
import { useState, useContext } from 'react';
import { MessageContext } from '../../../contexts/MessageContext';



export default function Textbox({placeholderText = ''}) {


    const {messages, setMessages, askGpt, countries, setCountry} = useContext(MessageContext);

    const [newGuess, setNewGuess] = useState('');

    /* This function adds the new message written to the list of messages and
    erases the content in the text box */
    const handleCreateNewGuess = async (e: React.FormEvent<HTMLFormElement>) => {
        
        e.preventDefault();
        setCountry(newGuess);
        

    }
    /* This function gets the value written on the input */
    const handleNewGuessChange = (e: string) => {

        // e.currentTarget.setCustomValidity('');
        
        setNewGuess(e);
    }


    return (

        <form onSubmit={handleCreateNewGuess} className={styles.textfield}>
            <div className={styles.selector}>
                <select onChange={(e) => { handleNewGuessChange(e.currentTarget.value); }}>
                    <option disabled>Choose a country</option>
                    {countries.map( country => {
                        return (
                            <option value={country}>{country}</option>
                        )
                    })}
                </select>
            </div>
            <button type='submit'><FiSend/></button>
        </form>

    )
}