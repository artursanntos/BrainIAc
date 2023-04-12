import styles from './Topbar.module.css';
import MyModal from '../modal/Modal';
import React, { useState } from 'react';
import { AiOutlineQuestionCircle } from "react-icons/ai";

export default function Topbar() {

const [isModalOpen, setIsModalOpen] = useState(false);

const handleOpenModal = () => {
    setIsModalOpen(true);
};

const handleCloseModal = () => {
    setIsModalOpen(false);
};

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
        </div>
    )
    
}