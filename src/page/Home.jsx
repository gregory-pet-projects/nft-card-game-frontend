import React, { useState } from "react";
import { CustomButton, CustomInput, PageHOC } from "../components";
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
  const { contract, walletAddress, setShowAlert } = useGlobalContext();
  const [playerName, setPlayerName] = useState("");

  const handleRegister = async () => {
    try {
      const palyerExists = await contract?.isPlayer(walletAddress);
      if (!palyerExists) {
        await contract.registerPlayer(playerName, playerName);
        setShowAlert({
          status: true,
          type: "info",
          message: `${playerName} is being summoned!`,
        });
      }
    } catch (e) {
      setShowAlert({
        status: true,
        type: "failure",
        message: "Something went wrong!",
      });
    }
  };

  return (
    <div className="flex flex-col">
      <CustomInput
        label="Name"
        placeholder="Enter your player name"
        value={playerName}
        onChange={setPlayerName}
      />
      <CustomButton
        title="Register"
        onClick={handleRegister}
        restStyles="mt-6"
      />
    </div>
  );
};

export default PageHOC(Home, TITLE, DESCRIPTION);
