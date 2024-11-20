import style from "./field.module.css";

const Field = ({ title, onTitle }) => {
  const handleChange = (e) => {
    onTitle(e.target.value);
  };

  return (
    <div className={style.container}>
      <input onChange={handleChange} value={title} />
    </div>
  );
};

export default Field;
