import styles from "./Loading.module.css";

const Loading = () => {
  return <div className={styles["container"]}>
    <i class="fa-solid fa-spinner"></i>
  </div>;
};

export default Loading;
