import styles from './Topbar.module.css';
import MyModal from '../modal/Modal';
import { useContext, useState, useEffect } from 'react';
import { AiOutlineQuestionCircle } from "react-icons/ai";
import { Win } from '../win/win';
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
            <p>BranIAc</p>
            <div>
                <button onClick={handleOpenModal}><AiOutlineQuestionCircle/></button>
                {isModalOpen && (
                <MyModal
                    title="Como jogar"
                    body="Você recebe um país e eu respondo apenas com SIM ou NÃO às suas perguntas até que você adivinhe corretamente o país escolhido."
                    onClose={handleCloseModal}
                    />
                )}
            </div>
            <div>{winModalOpen && <Win/>}</div>
        </div>
    )
}
