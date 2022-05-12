import React from 'react';
import {StrictMode} from "react";
import ReactDOM from "react-dom";
import App from './App';
import {Web3ReactProvider} from '@web3-react/core'
import {ethers} from "ethers";


function getLibrary(provider) {
    const library = new ethers.providers.Web3Provider(provider);
    library.pollingInterval = 8000; // frequency provider is polling
    return library;
}

const rootElement = document.getElementById("root");
ReactDOM.render(
    <StrictMode>
        <Web3ReactProvider getLibrary={getLibrary}>
            <App/>
        </Web3ReactProvider>
    </StrictMode>,
    rootElement
);