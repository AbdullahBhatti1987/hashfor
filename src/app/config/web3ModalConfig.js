import { CoinbaseWalletSDK } from "@coinbase/wallet-sdk";
import WalletConnectProvider from "@walletconnect/web3-provider";

export const providerOptions = {
  coinbasewallet: {
    package: CoinbaseWalletSDK,
    options: {
      appName: "Web3Modal Demo",
      rpc: "https://rpc.testnet.fantom.network",
    },
  },
  walletconnect: {
    package: WalletConnectProvider,
    options: {
      rpc: {
        4002: "https://rpc.testnet.fantom.network",
      },
      bridge: "https://bridge.walletconnect.org",
      qrcode: true,
    },
  },
};