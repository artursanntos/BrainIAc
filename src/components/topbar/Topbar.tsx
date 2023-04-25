import styles from './Topbar.module.css';
import MyModal from '../modal/Modal';
import { useContext, useState, useEffect } from 'react';
import { AiOutlineQuestionCircle } from "react-icons/ai";
import { Win } from '../win/Win';
import { WinContext } from '../../contexts/WinContext';
import NewGame from '../newgame/NewGame';
import Logo from '../logo/Logo';


export default function Topbar() {

    const { isWinOpen } = useContext(WinContext);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [winModalOpen, setWinModalOpen] = useState(false);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    useEffect(() => {
        if (isWinOpen) {
            setWinModalOpen(true);
        }
    }, [isWinOpen]);

    return (
        <div className={styles.wrapper}>
            <div className={styles.logo}><Logo/></div>
            
            <p>BrainIAc</p>
            <div>
                <button className={styles.modalButton} onClick={handleOpenModal}><AiOutlineQuestionCircle/></button>
                {isModalOpen && (
                <MyModal
                    title="How to play"
                    body="BranIAc is an Artificial Intelligence interactive game in which the player's goal is to guess the mysterious country through questions."
                    onClose={handleCloseModal}
                    />
                )}
            </div>
            <div>{winModalOpen && <Win/>}</div>
        </div>
        
    )
}
