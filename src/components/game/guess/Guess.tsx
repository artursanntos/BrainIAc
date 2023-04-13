import styles from './Guess.module.css';
import Flag from 'react-world-flags';
import { BiRightTopArrowCircle } from "react-icons/bi";


export default function Guess() {
    return (

        <div className={styles.container}>
            <Flag code="ar" height="10"/>
            <p className={styles.countryName}>Argentina</p>
            <div className={styles.distanceDirection}>
                <p className={styles.distance}>2600 km</p>
                <BiRightTopArrowCircle size={31} color={"var(--blue-100)"}/>
            </div>
            
        </div>
        
    )
    
}