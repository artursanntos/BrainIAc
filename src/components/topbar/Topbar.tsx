import styles from './Topbar.module.css';
import MyModal from '../modal/Modal';
import { useContext, useState, useEffect } from 'react';
import { AiOutlineQuestionCircle } from "react-icons/ai";
import { Win } from '../win/Win';
import { Lose } from '../lose/Lose';
import { WinContext } from '../../contexts/WinContext';
import NewGame from '../newgame/NewGame';
import Logo from '../logo/Logo';


export default function Topbar() {

    const { isWinOpen, isLoseOpen } = useContext(WinContext);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [winModalOpen, setWinModalOpen] = useState(false);
    const [loseModalOpen, setLoseModalOpen] = useState(false);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    // checks if isWinOpen flag is true so it actually opens the modal
    useEffect(() => {
        if (isWinOpen) {
            setWinModalOpen(true);
        }
    }, [isWinOpen]);

    // checks if isLoseOpen flag is true so it actually opens the modal
    useEffect(() => {
        if (isLoseOpen)  {
            setLoseModalOpen(true);
        }
    }, [isLoseOpen])

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
            <div>{loseModalOpen && <Lose/>}</div>
        </div>
        
    )
}
