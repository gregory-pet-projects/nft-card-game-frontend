import React from "react";
import { PageHOC } from "../components";

const TITLE = (
  <>
    Create <br />a new Battle
  </>
);

const DESCRIPTION =
  "Create your own battle and wait for ither players to join you";

const CreateBattle = () => {
  return (
    <div>
      <h1 className="text-white text-xl">Hello </h1>
    </div>
  );
};

export default PageHOC(CreateBattle, TITLE, DESCRIPTION);
