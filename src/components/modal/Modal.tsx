// Example of Modal component using react-modal library
import React from 'react';
import Modal from 'react-modal';
import { CgCloseO } from "react-icons/cg";

import styles from './Modal.module.css';

interface ModalProps {
  title: string;
  body: string;
  onClose: () => void;
}

const fadedBg = {
    overlay: {
        background: "#00000085"
    }
}

const MyModal: React.FC<ModalProps> = ({title, body, onClose}) => {
  return (
    <Modal className={styles.modal} isOpen={true} onRequestClose={onClose} style={fadedBg}>
      <div>
        <h1>{title}</h1>
        <button onClick={onClose}><CgCloseO/></button>
      </div>
        <p>{body}</p>
        <p className={styles.regras}>Regras:</p>
        <p>- Construa BEM suas perguntas de SIM ou NÃO</p>
        <p>- Faça palpites</p>
        <p>- Divirta-se</p>

    </Modal>
  );
};

export default MyModal;
