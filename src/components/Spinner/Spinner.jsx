import style from "./spinner.module.css";
import spinner from "./spinner.gif";

function Spinner() {
  return (
    <div className={style.container}>
      <img src={spinner}></img>
    </div>
  );
}

export default Spinner;
