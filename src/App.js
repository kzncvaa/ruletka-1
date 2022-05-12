import {useWeb3React} from "@web3-react/core";
import {connectors} from "./connectors";
import {useEffect, useState} from "react";


function App() {
    const {library, chainId, account, activate, deactivate, active} = useWeb3React();

    useEffect(() => {
        const provider = window.localStorage.getItem("provider");
        if (provider) activate(connectors[provider]);
    }, []);

    const setProvider = (type) => {
        window.localStorage.setItem("provider", type);
    };

    return (
        <>
            <div className="wallet_items">
                <a onClick={() => {
                    activate(connectors.injected);
                    setProvider("injected");
                }}>
                    <div className="wallet_item">
                        <img src="img/metamask.png" alt=""/>
                        <p>Metamask</p>
                    </div>
                </a>
                <a onClick={
                    () => {
                        activate(connectors.walletConnect);
                        setProvider("walletConnect");
                    }}>
                    <div className="wallet_item">
                        <img src="img/wallet_connect.png" alt=""/>
                        <p>WalletConnect</p>
                    </div>
                </a>
                <a onClick={() => {
                    activate(connectors.coinbaseWallet);
                    setProvider("coinbaseWallet");
                }}>
                    <div className="wallet_item">
                        <img src="img/coinbase.png" alt=""/>
                        <p>Coinbase</p>
                    </div>
                </a>
            </div>
            <div className="wallet_more">
                <img src="img/information.png" alt=""/>
                <a href="/">Learn how to connect</a>
            </div>
        </>
    );
}

export default App;
