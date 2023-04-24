import styles from './Win.module.css';
import Modal from 'react-modal';
import { CgCloseO } from "react-icons/cg";
import { WinContext } from '../../contexts/WinContext';
import { useContext } from 'react';
import NewGame from '../newgame/NewGame';

const fadedBg = {
    overlay: {
        background: "#00000085"
    }
}

/* This component is the modal that opens when the player wins the game */
export function Win() {
    
    const { setIsWinOpen, isWinOpen } = useContext(WinContext);

    const handleCloseWin = () => {
        setIsWinOpen(false);
    }
    

    return (
        <Modal className={styles.win} isOpen={isWinOpen} onRequestClose={handleCloseWin} style={fadedBg}>
            <div className={styles.header}>
                <h1>Well done!</h1>
                <button className={styles.closeButton} onClick={handleCloseWin}><CgCloseO/></button>
            </div>
            <div className={styles.footer}>
                <h3>You won!</h3>
                <span role="img" aria-label="party popper">🎉</span>
            </div>
            <div className={styles.newGame}>
                <p>Would you like to play again?</p>
                <NewGame/>
                
            </div>
            
        </Modal>
    );

}
