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
        <h1>Welcome to BrainIAc!</h1>
        <button onClick={onClose}><CgCloseO/></button>
      </div>
        <p>{body}</p>
        <h2>{title}</h2>
        <p className={styles.regras}>Rules</p>
        <p>- Build <b>YES</b> or <b>NO</b> questions.</p>
        <p>- Make guesses</p>
        <p className={styles.regras}>Hints</p>
        <p><b>Be specific:</b> Provide as much information as possible in the question to make it clear what kind of answer is expected</p>
        <p><b>Use clear and concise language:</b> Use language that clearly communicates the question and the expected yes or no response.</p>

    </Modal>
  );
};

export default MyModal;
