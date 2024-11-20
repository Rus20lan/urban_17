import "./App.css";
import Button from "./components/Button/Button";
import { useUnit } from "effector-react";
import {
  $itemsStore,
  $loading,
  addItem,
  updateFailedField,
  fetchProductFx,
} from "./stores/itemsStore";
import Lists from "./components/Lists/Lists";
import Field from "./components/Field/Field";
import { useEffect, useState } from "react";
import Spinner from "./components/Spinner/Spinner";

function App() {
  const [title, setTitle] = useState("");
  // const { loading, failed } = useUnit($itemsStore);
  const loading = useUnit($loading);
  const { failed } = useUnit($itemsStore);
  const handleClickAdd = (obj) => {
    if (obj && obj.title !== "") {
      addItem(obj);
      setTitle("");
    }
  };

  const handleClickApi = () => {
    const id = Math.floor(Math.random() * (20 - 1 + 1)) + 1;
    fetchProductFx(id);
  };

  useEffect(() => {
    if (failed) {
      alert(failed);
      updateFailedField("");
    }
  }, [failed]);

  return (
    <div className="App">
      <div className="btns_container">
        <Field title={title} onTitle={setTitle} />
        <Button
          text={"Add Item"}
          onHandleClick={() => {
            handleClickAdd({ title });
          }}
        />
        <Button text={"Items from Api"} onHandleClick={handleClickApi} />
      </div>
      <div className="lists_container">
        {loading && <Spinner />}
        {/* {failed && <span>{failed}</span>} */}
        {!loading && <Lists />}
      </div>
    </div>
  );
}

export default App;
