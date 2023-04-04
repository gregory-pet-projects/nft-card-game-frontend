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
  const {} = useGlobalContext();

  return <div>JoinBattle</div>;
};

export default PageHOC(JoinBattle, TITLE, DESCRIPTION);
