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

const defaultGameData = {
  payers: [],
  pendingBattles: [],
  activeBattle: null,
};

export const GlobalContextProvider = ({ children }) => {
  const [walletAddress, setWalletAddress] = useState("");
  const [contract, setContract] = useState(null);
  const [provider, setProvider] = useState(null);
  const [showAlert, setShowAlert] = useState(defaultAlertState);
  const [battleName, setBattleName] = useState("");
  const [gameData, setGameData] = useState(defaultGameData);
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

  //Set the game data to the state
  const fetchGameData = async () => {
    if (contract) {
      const fetchedBattles = await contract.getAllBattles();
      const pendingBattles = fetchedBattles.filter(
        (battle) => battle.battleStatus === 0
      );
      let activeBattle = null;

      fetchedBattles.forEach((battle) => {
        if (
          battle.players.find(
            (player) => player.toLowerCase() === walletAddress.toLowerCase()
          )
        ) {
          if (battle.winner.startsWith("0x00")) {
            activeBattle = battle;
          }
        }
      });

      setGameData({ pendingBattles: pendingBattles.slice(1), activeBattle });
    }
  };
  useEffect(() => {
    if (contract) {
      fetchGameData();
    }
  }, [contract]);

  return (
    <GlobalContext.Provider
      value={{
        contract,
        walletAddress,
        showAlert,
        setShowAlert,
        battleName,
        setBattleName,
        gameData,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
