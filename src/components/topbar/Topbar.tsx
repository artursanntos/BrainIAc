import styles from './Topbar.module.css';
import MyModal from '../modal/Modal';
import { useContext, useState, useEffect } from 'react';
import { AiOutlineQuestionCircle } from "react-icons/ai";
import { Win } from '../win/Win';
import { WinContext } from '../../contexts/WinContext';


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
            <img src="./src/assets/logo.svg" alt="logo" />
            <p>BrainIAc</p>
            <h6>powered by GPT3.5</h6>
            <div>
                <button onClick={handleOpenModal}><AiOutlineQuestionCircle/></button>
                {isModalOpen && (
                <MyModal
                    title="Como jogar"
                    body="BranIAc é um jogo de interação com Inteligência Artificial no qual o jogador tem o propósito de acertar o país da IA por meio de perguntas."
                    onClose={handleCloseModal}
                    />
                )}
            </div>
            <div>{winModalOpen && <Win/>}</div>
        </div>
        
    )
}
