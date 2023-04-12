import { useNavigate } from "react-router-dom";
import { CustomButton, PageHOC } from "../components";
import { useGlobalContext } from "../context";
import styles from "../styles";
import { useEffect } from "react";

const TITLE = (
  <>
    Join <br />
    Battle
  </>
);

const DESCRIPTION = "Join already existing battles";

const JoinBattle = () => {
  const navigate = useNavigate();
  const {
    contract,
    gameData,
    setShowAlert,
    setBattleName,
    walletAddres,
    setErrorMessage,
  } = useGlobalContext();
  const createBattleHandler = () => navigate("/create-battle");
  const isAnyPendingBattles = !!gameData?.pendingBattles?.length;

  const filteredBattle = gameData?.pendingBattles?.filter(
    (battle) => !battle.players.includes(walletAddres)
  );

  useEffect(() => {
    if (gameData?.activeBattle?.battleStatus === 1)
      navigate(`/battle/${gameData.activeBattle.name}`);
  }, [gameData]);

  const handleJoinBattle = async (battleName) => {
    setBattleName(battleName);

    try {
      await contract.joinBattle(battleName);

      setShowAlert({
        status: true,
        type: "success",
        message: `Joining ${battleName}`,
      });
    } catch (error) {
      setErrorMessage(error);
    }
  };

  return (
    <>
      <h2 className={styles.joinHeadText}>Availabel Battles:</h2>
      <div className={styles.joinContainer}>
        {isAnyPendingBattles ? (
          filteredBattle.map((battle, idx) => (
            <div className={styles.flexBetween} key={idx}>
              <p className={styles.joinBattleTitle}>
                {idx + 1}. {battle.name}
              </p>
              <CustomButton
                title="Join"
                onClick={() => handleJoinBattle(battle.name)}
              />
            </div>
          ))
        ) : (
          <p className={styles.joinLoading}>
            Reload the page to see new battles
          </p>
        )}
      </div>
      <p className={styles.infoText} onClick={createBattleHandler}>
        Or create a new battle
      </p>
    </>
  );
};

export default PageHOC(JoinBattle, TITLE, DESCRIPTION);
