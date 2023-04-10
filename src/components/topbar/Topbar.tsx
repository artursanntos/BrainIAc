import styles from './Topbar.module.css';

export default function Topbar() {

    return (
        <div className={styles.wrapper}>
            <img src="./src/assets/logo.svg" alt="logo" />
            <p>Worldzy</p>
        </div>
    )
    
}