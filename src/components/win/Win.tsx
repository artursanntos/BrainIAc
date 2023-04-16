import styles from './Win.module.css';
import Modal from 'react-modal';
import { CgCloseO } from "react-icons/cg";
import { WinContext } from '../../contexts/WinContext';
import { useContext } from 'react';

const fadedBg = {
    overlay: {
        background: "#00000085"
    }
}

export function Win() {
    
    const {setIsWinOpen, isWinOpen} = useContext(WinContext);
    
    const handleCloseWin = () => {
        setIsWinOpen(false);
    }
    

    return (
        <Modal className={styles.win} isOpen={isWinOpen} onRequestClose={handleCloseWin} style={fadedBg}>
            <div className={styles.header}>
                <h1>Well done!</h1>
                <button onClick={handleCloseWin}><CgCloseO/></button>
            </div>
            <div className={styles.footer}>
                <h3>You won!</h3>
                <span role="img" aria-label="party popper">🎉</span>
            </div>
            
        </Modal>
    );

}
