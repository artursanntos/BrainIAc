import styles from './NewGame.module.css';
import { useContext } from 'react';
import { WinContext } from '../../contexts/WinContext';
import { MessageContext } from '../../contexts/MessageContext';

export default function NewGame() {

    const { setGuesses, setMessages, setSolution, countries } = useContext(MessageContext);
    const { setWin, setIsWinOpen } = useContext(WinContext);

    const handleNewGame = () => {

        const randomIndex = Math.floor(Math.random() * countries.length);
        setSolution(countries[randomIndex]);
        setGuesses([]);
        setMessages([{ content : "Hi, I've already thought of a country! Ask me any Yes or No question.", isUserMessage: false }]);
        setWin(false);
        setIsWinOpen(false);
    }

    return (
        <button className={styles.newgame} onClick={handleNewGame}>
            New Game
        </button>
    )
}