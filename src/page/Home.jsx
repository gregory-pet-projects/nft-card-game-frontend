import React from 'react';
import { PageHOC } from "../components";
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

  return (
    <div>
      <h1 className="text-xl text-white"></h1>
    </div>
  );
};

export default PageHOC(Home, TITLE, DESCRIPTION);