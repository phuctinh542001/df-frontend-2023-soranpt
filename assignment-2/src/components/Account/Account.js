import { useContext } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";
import styles from "./Account.module.css";

const Account = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <div className={`${styles["account"]} ${styles[`theme-${theme}`]}`}>
      <div className="account-image">
        <i className="fa-regular fa-circle-user"></i>
      </div>
      <div className="account-name">
        <span>SoraNPT</span>
      </div>
    </div>
  );
};

export default Account;
