import React from "react";
import styles from "../styles";
const playerNameRegex = /^[A-Za-z0-9]+$/;

const CustomInput = ({ label, placeholder, value, onChange }) => {
  return (
    <>
      <label htmlFor="name" className={styles.label}>
        {label}
      </label>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => {
          const val = e.target.value;
          if (val === "" || playerNameRegex.test(val)) {
            onChange(val);
          }
        }}
        className={styles.input}
      />
    </>
  );
};

export default CustomInput;
