import React from "react";
import styles from "../styles";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../context";
import CustomButton from "./CustomButton";
import { player01, player02 } from "../assets";
import { shortPreviewWalletAddress } from "../utils/service";

const Player = ({ address, img }) => (
  <div className={`${styles.flexCenter} flex-col`}>
    <img src={img} alt="player image" className={styles.playerImg} />
    <p className={styles.gameLoadPlayerText}>{address}</p>
  </div>
);

const GameLoad = () => {
  const navigate = useNavigate();
  const { walletAddress } = useGlobalContext();
  const goToBattleHandler = () => navigate("/battleground");

  return (
    <div className={`${styles.flexBetween} ${styles.gameLoadContainer}`}>
      <div className={styles.gameLoadBtnBox}>
        <CustomButton
          title="Choose Battleground"
          onClick={goToBattleHandler}
          restStyles="mt-6"
        />
      </div>
      <div className={`flex-1 ${styles.flexCenter} flex-col`}>
        <h1 className={`${styles.headText} text-center`}>
          Waiting for a <br /> worthy opponent...
        </h1>
        <p className={styles.gameLoadText}>
          Protip: while you're waiting, choose your preferred battleground
        </p>
        <div className={styles.gameLoadPlayersBox}>
          <Player
            address={shortPreviewWalletAddress(walletAddress)}
            img={player01}
          />
          <h2 className={styles.gameLoadVS}>Vs</h2>
          <Player address={"???????????"} img={player02} />
        </div>
      </div>
    </div>
  );
};

export default GameLoad;
