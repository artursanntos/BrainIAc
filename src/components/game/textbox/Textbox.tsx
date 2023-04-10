import styles from './Textbox.module.css';
import { FiSend } from "react-icons/fi";



export default function Textbox({placeholderText = ''}) {

    return (

        <div className={styles.textfield}>
            <input
                type="text" 
                placeholder={placeholderText}/>
            <button type='submit'><FiSend/></button>
        </div>

    )
}