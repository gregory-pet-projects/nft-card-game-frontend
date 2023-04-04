import { useNavigate } from "react-router-dom";
import { PageHOC } from "../components";
import { useGlobalContext } from "../context";
import styles from "../styles";

const TITLE = (
  <>
    Join <br />
    Battle
  </>
);

const DESCRIPTION = "Join already existing battles";

const JoinBattle = () => {
  const navigate = useNavigate();
  const {} = useGlobalContext();
  const createBattleHandler = () => navigate("/create-battle");

  return (
    <>
      <h2 className={styles.joinHeadText}>Availabel Battles:</h2>
      <p className={styles.infoText} onClick={createBattleHandler}>
        Or create a new battle
      </p>
    </>
  );
};

export default PageHOC(JoinBattle, TITLE, DESCRIPTION);
