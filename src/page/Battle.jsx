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

  const getPlayerInfo = async () => {
    try {
      let player01Adress = null;
      let player02Adress = null;

      const player1DataAdress = gameData?.activeBattle?.player[0];
      const player2DataAdress = gameData?.activeBattle?.player[1];
      if (player1DataAdress.toLowerCase() === walletAdress.toLowerCase()) {
        player01Adress = player1DataAdress;
        player02Adress = player2DataAdress;
      } else {
        player01Adress = player2DataAdress;
        player02Adress = player1DataAdress;
      }

      const p1TokenData = await contract.getPlayerToken(player01Adress);
      const player01 = await contract.getPlayer(player01Adress);
      const player02 = await contract.getPlayer(player02Adress);

      const p1Att = p1TokenData.attackStrength.toNumber();
      const p1Def = p1TokenData.defenseStrength.toNumber();

      const p1H = player01.playerHealth.toNumber();
      const p1M = player01.playerMana.toNumber();
      const p2H = player02.playerHealth.toNumber();
      const p2M = player02.playerHealth.toNumber();

      setPlayer1({
        ...player01,
        att: p1Att,
        def: p1Def,
        health: p1H,
        mana: p1M,
      });
      setPlayer2({ ...player02, att: "X", def: "X", health: p2H, mana: p2M });
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    if (contract && gameData?.activeBattle) {
      getPlayerInfo();
    }
  }, [contract, gameData, battleGround]);

  return (
    <div
      className={`${styles.flexBetween} ${styles.gameContainer} ${battleGround}`}
    >
      <h1 className="text-xl text-white">{battleName}</h1>
    </div>
  );
};

export default Battle;
