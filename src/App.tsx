import { useContext, useEffect, useState } from 'react';

import Topbar from './components/topbar/Topbar'
import Game from './components/game/Game';

import styles from './components/App.module.css';
import { MessageContext, MessageContextProvider } from './contexts/MessageContext';
import { WinContextProvider } from './contexts/WinContext';


function App() {


    return (

        <WinContextProvider>
        <MessageContextProvider>
            <div>
                <div><Topbar/></div>
                <div className={styles.wrapper}>
                    <Game/>
                </div>
            </div>

        </MessageContextProvider>
        </WinContextProvider>
            
    )
}

export default App
