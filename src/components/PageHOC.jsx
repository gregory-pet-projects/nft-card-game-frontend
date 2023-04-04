import React from "react";
import { useNavigate } from "react-router-dom";
import { logo, heroImg } from "../assets";
import styles from "../styles";
import { useGlobalContext } from "../context";
import Alert from "./Alert";
import { shortPreviewWalletAddress } from "../utils/service";

const PageHOC = (Component, title, description) => () => {
  const { showAlert, walletAddress } = useGlobalContext();
  const navigate = useNavigate();
  const userAddress = shortPreviewWalletAddress(walletAddress);
  return (
    <div className={styles.hocContainer}>
      {showAlert?.status && (
        <Alert message={showAlert?.message} type={showAlert?.type} />
      )}
      <div className={styles.hocContentBox}>
        <div className="flex items-center justify-between">
          <img
            src={logo}
            alt="logo"
            className={styles.hocLogo}
            onClick={() => navigate("/")}
          />
          {walletAddress && (
            <div className={styles.userAddressLabel}>{userAddress}</div>
          )}
        </div>
        <div className={styles.hocBodyWrapper}>
          <div className="flex flex-row w-full">
            <h1 className={`flex ${styles.headText} head-text`}>{title}</h1>
          </div>
          <p className={`${styles.normalText} my-10`}>{description}</p>
          <Component />
        </div>
        <p className={styles.footerText}>Mady with 💜 by GREGORY</p>
      </div>
      <div className="flex flex-1">
        <img
          alt="hero"
          src={heroImg}
          className="w-full xl:h-full object-cover"
        />
      </div>
    </div>
  );
};

export default PageHOC;
