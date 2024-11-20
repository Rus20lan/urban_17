import { useUnit } from "effector-react";
import { $itemsStore } from "../../stores/itemsStore";
import style from "./lists.module.css";

const Lists = () => {
  const { products } = useUnit($itemsStore);

  return (
    <ul className={style.products}>
      {products.length !== 0
        ? products.map((product, index) => (
            <li className={style.product} key={index}>
              {product.title}
            </li>
          ))
        : null}
    </ul>
  );
};

export default Lists;
