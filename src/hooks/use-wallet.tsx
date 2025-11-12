"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from "react";
import { ethers } from "ethers";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";

interface WalletContextType {
  connectWallet: () => Promise<void>;
  disconnectWallet: () => Promise<void>;
  provider: ethers.BrowserProvider | null;
  signer: ethers.JsonRpcSigner | null;
  address: string | null;
  chainId: number | null;
  isConnected: boolean;
  isConnecting: boolean;
  error: Error | null;
}

const WalletContext = createContext<WalletContextType | null>(null);

const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider,
    options: {
      infuraId: process.env.NEXT_PUBLIC_INFURA_ID || "8043bb2cf99347b1bfadfb233c5325c0", // default public infura id
    },
  },
};

let web3Modal: Web3Modal | null;
if (typeof window !== "undefined") {
  web3Modal = new Web3Modal({
    cacheProvider: true,
    providerOptions,
  });
}


export const WalletProvider = ({ children }: { children: ReactNode }) => {
  const [provider, setProvider] = useState<ethers.BrowserProvider | null>(null);
  const [signer, setSigner] = useState<ethers.JsonRpcSigner | null>(null);
  const [address, setAddress] = useState<string | null>(null);
  const [chainId, setChainId] = useState<number | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState<Error | null>(null);


  const handleAccountsChanged = useCallback(
    (accounts: string[]) => {
      if (accounts.length > 0) {
        setAddress(ethers.getAddress(accounts[0]));
      } else {
        disconnectWallet();
      }
    },
    []
  );

  const handleChainChanged = useCallback((newChainId: string) => {
    setChainId(parseInt(newChainId, 16));
    // Re-connect to ensure provider and signer are updated
    connectWallet();
  }, []);

  const handleDisconnect = useCallback(() => {
    disconnectWallet();
  }, []);


  const connectWallet = useCallback(async () => {
    if (provider) return;
    setIsConnecting(true);
    setError(null);

    try {
      if (!web3Modal) {
        throw new Error("Web3Modal is not initialized.");
      }
      const instance = await web3Modal.connect();

      if (instance.on) {
        instance.on("accountsChanged", handleAccountsChanged);
        instance.on("chainChanged", handleChainChanged);
        instance.on("disconnect", handleDisconnect);
      }
      
      const newProvider = new ethers.BrowserProvider(instance);
      const newSigner = await newProvider.getSigner();
      const newAddress = await newSigner.getAddress();
      const network = await newProvider.getNetwork();

      setProvider(newProvider);
      setSigner(newSigner);
      setAddress(newAddress);
      setChainId(Number(network.chainId));
    } catch (err) {
      console.error("Failed to connect wallet:", err);
      setError(err instanceof Error ? err : new Error("An unknown error occurred"));
      await disconnectWallet();
    } finally {
      setIsConnecting(false);
    }
  }, [provider, handleAccountsChanged, handleChainChanged, handleDisconnect]);


  const disconnectWallet = useCallback(async () => {
    if (web3Modal) {
      web3Modal.clearCachedProvider();
    }

    if (provider && provider.provider && (provider.provider as any).removeListener) {
        (provider.provider as any).removeListener("accountsChanged", handleAccountsChanged);
        (provider.provider as any).removeListener("chainChanged", handleChainChanged);
        (provider.provider as any).removeListener("disconnect", handleDisconnect);
    }

    setProvider(null);
    setSigner(null);
    setAddress(null);
    setChainId(null);
    setIsConnecting(false);
  }, [provider, handleAccountsChanged, handleChainChanged, handleDisconnect]);


  useEffect(() => {
    if (web3Modal?.cachedProvider) {
      connectWallet();
    }
  }, [connectWallet]);
  

  return (
    <WalletContext.Provider
      value={{
        connectWallet,
        disconnectWallet,
        provider,
        signer,
        address,
        chainId,
        isConnected: !!provider && !!address,
        isConnecting,
        error,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};


export const useWallet = (): WalletContextType => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error("useWallet must be used within a WalletProvider");
  }
  return context;
};

/**
 * Security Notes:
 * 
 * 1. Client-Side Logic: The code in this hook runs on the client-side.
 *    Never include sensitive information like private keys or secrets here.
 * 
 * 2. Transaction Verification: While this hook helps initiate transactions,
 *    always verify critical transactions on your backend. A malicious user
 *    could try to manipulate the transaction details on the client before sending.
 *    Your backend should independently verify the transaction's amount, recipient,
 *    and any other important data before processing or storing it.
 * 
 * 3. Network Changes: The app requests the user to switch to the correct network,
 *    but you should still validate the `chainId` for any on-chain interactions
 *    to prevent transactions from being sent to the wrong network.
 */
