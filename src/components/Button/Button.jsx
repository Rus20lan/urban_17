import style from "./button.module.css";

const Button = (props) => {
  const { text, onHandleClick } = props;

  return (
    <button className={style.container} onClick={onHandleClick}>
      {text}
    </button>
  );
};

export default Button;
