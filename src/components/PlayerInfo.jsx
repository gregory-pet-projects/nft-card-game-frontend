import styles from "../styles";
import ReactTooltip from "react-tooltip";
import { shortPreviewWalletAddress } from "../utils/service";

const healtPoints = 25;
const healthLevel = (points = 0) =>
  points >= 12 ? "bg-green-500" : points >= 6 ? "bg-orange-500" : "bg-red-500";

const marginIndexing = (index) => (index !== healtPoints - 1 ? "mr-1" : "mr-0");

const PlayerInfo = ({ player, playerIcon, mt }) => {
  const health = [...Array(player?.health || 0).keys()];
  const playerNumber = mt ? "1" : "2";

  return (
    <div className={`${styles.flexCenter} ${mt ? "mt-4" : "mb-4"}`}>
      <img
        src={playerIcon}
        alt="player2"
        data-tip
        className="w-14 h-14 object-contain rounded-full"
        data-for={`Player-${playerNumber}`}
      />
      <div
        data-tip={`Health: ${player?.health}`}
        data-for={`Health-${playerNumber}`}
        className={styles.playerHealth}
      >
        {health.map((item, idx) => (
          <div
            key={`player-item-${item}`}
            className={`${styles.playerHealthBar} ${healthLevel(
              player?.health
            )} ${marginIndexing(idx)}`}
          />
        ))}
      </div>
      <div
        data-tip="Mana"
        data-for={`Mana-${playerNumber}`}
        className={`${styles.flexCenter} ${styles.glassEffect} ${styles.playerMana}`}
      >
        {player?.mana || 0}
      </div>
      <ReactTooltip
        id={`Player-${playerNumber}`}
        effect="solid"
        backgroundColor="#7f46f0"
      >
        <p className={styles.playerInfo}>
          <span className={styles.playerInfoSpan}>Name: </span>
          {player?.playerName}
        </p>
        <p className={styles.playerInfo}>
          <span className={styles.playerInfoSpan}>Address: </span>
          {shortPreviewWalletAddress(player?.playerAddress)}
        </p>
      </ReactTooltip>

      <ReactTooltip
        id={`Health-${playerNumber}`}
        effect="solid"
        backgroundColor="#7f46f0"
      />
      <ReactTooltip
        id={`Mana-${playerNumber}`}
        effect="solid"
        backgroundColor="#7f46f0"
      />
    </div>
  );
};

export default PlayerInfo;
