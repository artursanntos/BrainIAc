import styles from './Guessbox.module.css';
import { FiSend } from "react-icons/fi";
import { useState, useContext } from 'react';
import { MessageContext } from '../../../contexts/MessageContext';
import { WinContext } from '../../../contexts/WinContext';



export default function Textbox({}) {


    const {countries, guesses, setGuesses, solution} = useContext(MessageContext);

    const [newGuess, setNewGuess] = useState('');
    const { setIsWinOpen, setWin } = useContext(WinContext);

    /* This function adds the new message written to the list of messages and
    erases the content in the text box */
    const handleCreateNewGuess = async (e: React.FormEvent<HTMLFormElement>) => {
        
        e.preventDefault();
        setGuesses([...guesses, newGuess]);

        if (newGuess == solution) {
            setWin(true);
            setIsWinOpen(true);
        }
    }
    /* This function gets the value written on the input */
    const handleNewGuessChange = (e: string) => {
        setNewGuess(e);
    }


    return (

        <form onSubmit={handleCreateNewGuess} className={styles.textfield}>
            <div className={styles.selector}>
                <select defaultValue={'Select an option'} onChange={(e) => { handleNewGuessChange(e.currentTarget.value); }}>
                    <option disabled hidden> Select an option </option>
                    {countries.map( country => {
                        return (
                            <option value={country}>{country}</option>
                        )
                    })}
                </select>
            </div>
            <button className={styles.sendButton} type='submit'><FiSend/></button>
        </form>

    )
}