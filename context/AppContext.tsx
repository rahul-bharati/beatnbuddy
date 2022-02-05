import { createContext, useEffect, useState } from "react";
import { ethers } from "ethers";

interface IAppContext {
  walletConnected: boolean;
  currentAccount: string;
  connectWallet: Function;
}

export const AppContext = createContext<IAppContext>({
  walletConnected: false,
  currentAccount: "",
  connectWallet: () => {},
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

  return (
    <AppContext.Provider
      value={{ walletConnected, currentAccount, connectWallet }}
    >
      {children}
    </AppContext.Provider>
  );
};
