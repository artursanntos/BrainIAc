import { useState } from 'react';

import Topbar from './components/topbar/Topbar'
import Game from './components/game/Game';

import styles from './components/App.module.css';
import { MessageContextProvider } from './contexts/MessageContext';


function App() {

    return (

        <MessageContextProvider>
            <div>
                <div><Topbar/></div>
                <div className={styles.wrapper}>
                    <Game/>
                </div>
            </div>

        </MessageContextProvider>
            
    )
}

export default App
