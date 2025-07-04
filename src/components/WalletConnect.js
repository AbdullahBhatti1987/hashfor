import { useState, useRef, useEffect } from "react";
import { Web3Provider } from "@ethersproject/providers";
import Web3Modal from "web3modal";
import { providerOptions } from "../config/web3ModalConfig";
import { showErrorToast } from "@/lib/toast";

export const useWallet = () => {
  const [account, setAccount] = useState(null);
  const web3ModalRef = useRef(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      web3ModalRef.current = new Web3Modal({
        cacheProvider: false,
        providerOptions,
        themeVariables: {
          "--w3m-color-mix": "#00BB7F",
          "--w3m-color-mix-strength": 40,
        },
      });
    }
  }, []);

  const connectWallet = async () => {
    try {
      const instance = await web3ModalRef.current.connect();
      const provider = new Web3Provider(instance);
      const signer = provider.getSigner();
      const address = await signer.getAddress();
      setAccount(address);
    } catch (error) {
      showErrorToast("Wallet connection failed:");
    }
  };

  const disconnectWallet = async () => {
    try {
      await web3ModalRef.current.clearCachedProvider();
      setAccount(null);
    } catch (error) {
      showErrorToast("Wallet disconnection failed:");
    }
  };

  return { account, connectWallet, disconnectWallet };
};