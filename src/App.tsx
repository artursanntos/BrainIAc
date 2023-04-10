import { useState } from 'react';

import Topbar from './components/topbar/Topbar'
import Game from './components/game/Game';

import styles from './components/App.module.css';


function App() {

    return (
        <div>
            <div><Topbar/></div>
            <div className={styles.wrapper}>
                <Game/>
            </div>
        </div>
    )
}

export default App
