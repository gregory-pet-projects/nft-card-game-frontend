import React, { createContext, useContext, useEffect, useState } from "react";
import { ethers } from "ethers";
import Web3Modal from "web3modal";
import { ABI, ADDRESS } from "../contract";
import { createEventListeners } from "./createEventListeneres";
import { useNavigate } from "react-router-dom";

const GlobalContext = createContext();

const defaultAlertState = {
  status: false,
  type: "info",
  message: "",
};

export const GlobalContextProvider = ({ children }) => {
  const [walletAddress, setWalletAddress] = useState("");
  const [contract, setContract] = useState(null);
  const [provider, setProvider] = useState(null);
  const [showAlert, setShowAlert] = useState(defaultAlertState);
  const navigate = useNavigate();
  useEffect(() => {
    if (contract) {
      createEventListeners({
        navigate,
        contract,
        provider,
        walletAddress,
        setShowAlert,
      });
    }
  }, [contract]);

  useEffect(() => {
    if (showAlert?.status) {
      const timer = setTimeout(() => {
        setShowAlert(defaultAlertState);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [showAlert]);

  const setSmartContractAndProvider = async () => {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const newProvider = new ethers.providers.Web3Provider(connection);
    const signer = newProvider.getSigner();
    const newContract = new ethers.Contract(ADDRESS, ABI, signer);

    setProvider(newProvider);
    setContract(newContract);
  };

  //* Set the wallet address to the state
  const updateCurrentWalletAddress = async () => {
    const accounts = await window?.ethereum?.request({
      method: "eth_accounts",
    });
    if (accounts) setWalletAddress(accounts[0]);
  };

  useEffect(() => {
    window?.ethereum?.on("accountsChanged", updateCurrentWalletAddress);
    updateCurrentWalletAddress();
    //* Set the smart contract and provider to the state
    setSmartContractAndProvider();
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        contract,
        walletAddress,
        showAlert,
        setShowAlert,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
