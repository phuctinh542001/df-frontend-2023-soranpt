import styles from './Button.module.css';

const Button = ({ type = 'button', title, status, handleClick = null, handleHover = null}) => {
  return (
    <button
      className={`${styles['btn']} ${styles[`${status}`]}`}
      type={type}
      onClick={handleClick}
      onMouseOver={handleHover}
    >
      {title}
    </button>
  );
};

export default Button;
