import { createContext, useEffect, useState } from "react";
import { ethers } from "ethers";
import { Web3StorageToken } from "./../utils/tokensUtil";
import { Web3Storage } from "web3.storage";

import { sound, beatnbuddy } from "../config";

import SoundNFTContract from "../artifacts/contracts/Sound.sol/Sound.json";
import BeatnBuddyContract from "../artifacts/contracts/BeatnBuddy.sol/BeatnBuddy.json";
interface IAppContext {
  walletConnected: boolean;
  currentAccount: string;
  connectWallet: Function;
  storageClient: Web3Storage | null;
  isStorageClientValid: Function;
  getSoundNFTContract: Function;
  getBeatnBuddyContract: Function;
}

export const AppContext = createContext<IAppContext>({
  walletConnected: false,
  currentAccount: "",
  connectWallet: () => {},
  storageClient: null,
  isStorageClientValid: () => {},
  getSoundNFTContract: () => {},
  getBeatnBuddyContract: () => {},
});

declare global {
  interface Window {
    ethereum: any;
  }
}

interface Props {
  children: JSX.Element;
}

export const AppContextProvider = ({ children }: Props) => {
  const [walletConnected, setWalletConnected] = useState(false);
  const [currentAccount, setCurrentAccount] = useState("");
  const storageClient = new Web3Storage({ token: Web3StorageToken });

  const checkIfWalletIsConnected = async () => {
    const { ethereum } = window;
    try {
      if (!ethereum) return alert("Please install metamask");
      let provider = window.ethereum;
      const accounts = await provider.request({
        method: "eth_accounts",
      });

      if (accounts && accounts.length > 0) {
        setCurrentAccount(accounts[0]);
        return setWalletConnected(true);
      }
      setCurrentAccount("");
      return setWalletConnected(false);
    } catch (error) {
      console.log(error);
      throw new Error("No ethereum object");
    }
  };

  const connectWallet = async () => {
    const { ethereum } = window;
    try {
      if (!ethereum) return alert("Please install metamask");
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      setCurrentAccount(accounts[0]);
      setWalletConnected(true);
    } catch (error) {
      console.log(error);
      setCurrentAccount("");
      setWalletConnected(false);
    }
  };

  useEffect(() => {
    if (typeof window.ethereum) {
      window.ethereum.on("disconnect", () => {
        setWalletConnected(false);
        setCurrentAccount("");
      });
    }
    const isWalletConnected = async () => {
      await checkIfWalletIsConnected();
    };
    isWalletConnected();
  }, []);

  const isStorageClientValid = async () => {
    try {
      for await (const _ of storageClient.list({ maxResults: 1 })) {
        // any non-error response means the token is legit
        break;
      }
      return true;
    } catch (error: any) {
      // only return false for auth-related errors
      if (error.message.includes("401") || error.message.includes("403")) {
        console.log("invalid token", error.message);
        return false;
      }
    }
  };

  const getSoundNFTContract = () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(sound, SoundNFTContract.abi, signer);
    return contract;
  };

  const getBeatnBuddyContract = () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(
      beatnbuddy,
      BeatnBuddyContract.abi,
      signer
    );
    return contract;
  };

  return (
    <AppContext.Provider
      value={{
        walletConnected,
        currentAccount,
        connectWallet,
        storageClient,
        isStorageClientValid,
        getSoundNFTContract,
        getBeatnBuddyContract,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
