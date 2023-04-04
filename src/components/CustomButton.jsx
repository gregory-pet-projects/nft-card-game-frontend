import React from "react";
import styles from "../styles";

const CustomButton = ({ title, onClick, restStyles }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`${styles.btn} ${restStyles}`}
    >
      {title}
    </button>
  );
};

export default CustomButton;
