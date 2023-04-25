import styles from './Lose.module.css';
import Modal from 'react-modal';
import { CgCloseO } from "react-icons/cg";
import { WinContext } from '../../contexts/WinContext';
import { MessageContext } from '../../contexts/MessageContext';
import { useContext, useState } from 'react';

const fadedBg = {
    overlay: {
        background: "#00000085"
    }
}

/* This component is the modal that opens when the player Loses the game */
export function Lose() {
    
    // For organization matters, the lose flags are also in the win context
    const { setIsLoseOpen, isLoseOpen } = useContext(WinContext);
    const { solution } = useContext(MessageContext);

    const [isCopied, setIsCopied] = useState(false);

    const handleCloseLose = () => {
        setIsLoseOpen(false);
    }
    
    const copyContent = async() => {
        try {
            await navigator.clipboard.writeText('I could not figure out the mistery country! 🥲\nTry yourself: https://brainiac.vercel.app/')
            setIsCopied(true);
        }catch (error) {
            console.log(error);
            
        }
    }

    return (
        <Modal className={styles.lose} isOpen={isLoseOpen} onRequestClose={handleCloseLose} style={fadedBg}>
            <div className={styles.header}>
                <h1>Oh no 🥲</h1>
                <button className={styles.closeButton} onClick={handleCloseLose}><CgCloseO/></button>
            </div>
            <h3>You're out of guesses!</h3>
            <h4>The mistery country was <b>{solution}</b></h4>
            <div className={styles.sharePlaceholder}>
                <button className={styles.shareButton} onClick={copyContent}>Share</button>
            </div>
            <div className={styles.copied}>
                {isCopied && <p>copied to clipboard!</p>}
            </div>
            
            
        </Modal>
    );

}
