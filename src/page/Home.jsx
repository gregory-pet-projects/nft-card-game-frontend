import React, { useState } from "react";
import { CustomInput, PageHOC } from "../components";
import { useGlobalContext } from "../context";

const TITLE = (
  <>
    Welcome to Avax Gods <br /> a Web3 NFT Card Game
  </>
);

const DESCRIPTION = (
  <>
    Connect your wallet to start playing <br /> the ultimate Web3 Battle Card
    Game
  </>
);
const Home = () => {
  const { contract, walletAddress } = useGlobalContext();
  const [playerName, setPlayerName] = useState("");

  return (
    <div className="flex flex-col">
      <CustomInput
        label="Name"
        placeholder="Enter your player name"
        value={playerName}
        onChange={setPlayerName}
      />
    </div>
  );
};

export default PageHOC(Home, TITLE, DESCRIPTION);
