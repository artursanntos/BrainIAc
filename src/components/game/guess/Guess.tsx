import styles from './Guess.module.css';
import Flag from 'react-world-flags';
import { 
    BiRightTopArrowCircle, 
    BiDownArrowCircle, 
    BiUpArrowCircle, 
    BiLeftArrowCircle, 
    BiLeftDownArrowCircle, 
    BiLeftTopArrowCircle, 
    BiRightArrowCircle, 
    BiRightDownArrowCircle 
} from "react-icons/bi";

// Interface Guess props to ensure the types of the props
interface GuessProps {
    name: string,
    distance: string,
    direction: string
}

/* Creating a type for the Directions object to
   allow typescript to infer the type for direction correctly.
   It also shapes the objects and variables of the code */
type Directions = {
    [key: string]: JSX.Element;
}

type Flags = {
    [key: string]: string;
}

export default function Guess({name='Argentina', distance='2600', direction ='North'}: GuessProps) {

    // List flags with its respective code. e.g: Argentina: 'ar'
    // Flag codes here: https://github.com/smucode/react-world-flags/tree/master/src/svgs
    const flags: Flags = {
        'Argentina': 'ar',
        'Brasil': 'br',
        'Norway': 'nor'
    }

    const directions: Directions = {
        'Northeast': <BiRightTopArrowCircle size={31} color={"var(--blue-100)"}/>,
        'South': <BiDownArrowCircle size={31} color={"var(--blue-100)"}/>,
        'North': <BiUpArrowCircle size={31} color={"var(--blue-100)"}/>,
        'West': <BiLeftArrowCircle size={31} color={"var(--blue-100)"}/>,
        'Southwest': <BiLeftDownArrowCircle size={31} color={"var(--blue-100)"}/>,
        'Northwest': <BiLeftTopArrowCircle size={31} color={"var(--blue-100)"}/>,
        'East': <BiRightArrowCircle size={31} color={"var(--blue-100)"}/>,
        'Southeast': <BiRightDownArrowCircle size={31} color={"var(--blue-100)"}/>
    }

    return (

        <div className={styles.container}>
            <Flag code={flags[name]} height="10"/>
            <p className={styles.countryName}>{name}</p>
            <div className={styles.distanceDirection}>
                <p className={styles.distance}>{distance} km</p>
                {directions.hasOwnProperty(direction) && directions[direction]}
            </div>
            
        </div>
        
    )
    /* A função hasOwnProperty é uma função de objetos que checa se um dado objeto
    possui uma propriedade ou não. Retorna um booleano.*/
    
}