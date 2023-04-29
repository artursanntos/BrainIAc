import styles from './Guessbox.module.css';
import { FiSend } from "react-icons/fi";
import { useState, useContext, useEffect } from 'react';
import { MessageContext } from '../../../contexts/MessageContext';
import { WinContext } from '../../../contexts/WinContext';



export default function Textbox({}) {

    const {countries, guesses, setGuesses, solution, setGuessCount, guessCount} = useContext(MessageContext);

    const [newGuess, setNewGuess] = useState('');
    const { setIsWinOpen, setWin, win, lose, setIsLoseOpen, setLose } = useContext(WinContext);

    // This state controls whether the game has ended or not
    const [endGame, setEndGame] = useState(false);

    /* This function adds the new message written to the list of messages and
    erases the content in the text box */
    const handleCreateNewGuess = async (e: React.FormEvent<HTMLFormElement>) => {
        
        e.preventDefault();
        if (guessCount < 5 && !win) {
            setGuesses([...guesses, newGuess]);
            setGuessCount(guessCount + 1);

            if (newGuess == solution) {
                setWin(true);
                setIsWinOpen(true);
            } else if ((guessCount + 1) == 5) {
                setLose(true)
                setIsLoseOpen(true);
            }
        }
    
    }
    /* This function gets the value written on the input */
    const handleNewGuessChange = (e: string) => {
        setNewGuess(e);
    }

    useEffect(() => {
        if (localStorage.getItem('Lose') == 'true' || localStorage.getItem('Win') == 'true' || win || lose) {
            setEndGame(true);
        }
    }, [win, lose])

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
            <button className={styles.sendButton} type='submit' disabled={endGame}><FiSend/></button>
        </form>

    )
}