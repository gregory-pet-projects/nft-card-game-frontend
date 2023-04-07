import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../context";
import { useNavigate, useParams } from "react-router-dom";
import styles from "../styles";

const Battle = () => {
  const {
    contract,
    gameData,
    walletAdress,
    showAlert,
    setShowAlert,
    battleGround,
  } = useGlobalContext();
  const [palyer1, setPlayer1] = useState({});
  const [palyer2, setPlayer2] = useState({});
  const { battleName } = useParams();
  const navigate = useNavigate();


  return (
    <div
      className={`${styles.flexBetween} ${styles.gameContainer} ${battleGround}`}
    >
      <h1 className="text-xl text-white">{battleName}</h1>
    </div>
  );
};

export default Battle;
