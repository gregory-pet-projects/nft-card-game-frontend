import React, { useEffect, useState } from "react";
import { CustomButton, CustomInput, PageHOC, GameLoad } from "../components";
import styles from "../styles";
import { useGlobalContext } from "../context";
import { useNavigate } from "react-router-dom";

const TITLE = (
  <>
    Create <br />a new Battle
  </>
);

const DESCRIPTION =
  "Create your own battle and wait for ither players to join you";

const CreateBattle = () => {
  const navigate = useNavigate();
  const { contract, battleName, setBattleName, gameData } = useGlobalContext();
  const [waitBattle, setWaitBattle] = useState(false);

  const createBattleHandler = async () => {
    if (!battleName || !battleName.trim()) return null;

    try {
      await contract.createBattle(battleName);
    } catch (e) {
      console.error(e);
    }
  };
  const joinBattleHandler = () => navigate("/join-battle");

  useEffect(() => {
    if (gameData?.activeBattle?.battleStatus === 0) {
      setWaitBattle(true);
    }
  }, [gameData]);

  return (
    <>
      {waitBattle && <GameLoad />}
      <div className="flex flex-col mb-5">
        <CustomInput
          label="Battle"
          placeholder="Enter battle name"
          value={battleName}
          onChange={setBattleName}
        />
        <CustomButton
          title="Create Battle"
          onClick={createBattleHandler}
          restStyles="mt-6"
        />
      </div>
      <p className={styles.infoText} onClick={joinBattleHandler}>
        Or join already existing battles
      </p>
    </>
  );
};

export default PageHOC(CreateBattle, TITLE, DESCRIPTION);
