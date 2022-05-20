import { InjectedConnector } from "@web3-react/injected-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import { WalletLinkConnector } from "@web3-react/walletlink-connector";
import WalletConnectProvider from "@walletconnect/web3-provider";


const injected = new InjectedConnector({
    supportedChainIds: [1, 3, 4, 5, 42]
});

// const walletconnect = new WalletConnectConnector({
//     rpcUrl: `https://mainnet.infura.io/v3/${process.env.INFURA_KEY}`,
//     bridge: "https://bridge.walletconnect.org",
//     // rpc: {
//     //     56: " https://bsc-dataseed.binance.org"
//     // },
//     qrcode: true
// });

const walletconnect = new WalletConnectProvider({
    rpc: {
        56: " https://bsc-dataseed.binance.org"
    },
});

const walletlink = new WalletLinkConnector({
    url: `https://mainnet.infura.io/v3/${process.env.INFURA_KEY}`,
    appName: "ruletka"
});

export const connectors = {
    injected: injected,
    walletConnect: walletconnect,
    coinbaseWallet: walletlink
};
