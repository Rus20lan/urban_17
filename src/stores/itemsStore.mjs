import { createEffect, createEvent, createStore } from "effector";

export const addItem = createEvent();
export const updateFailedField = createEvent();
// export const loadingProducts = createEvent();

export const fetchProductFx = createEffect(async (id) => {
  const res = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`);

  if (!res.ok) {
    throw new Error("Ошибка в получении данных");
  }
  return await res.json();
});

export const $itemsStore = createStore({
  products: [],
  failed: "",
})
  .on(addItem, (state, payload) =>
    Object.assign({}, { ...state }, { products: [...state.products, payload] })
  )
  .on(updateFailedField, (state, payload) => ({ ...state, failed: payload }))
  .on(fetchProductFx.doneData, (state, payload) =>
    Object.assign(
      {},
      { ...state },
      { products: [...state.products, payload], failed: "" }
    )
  )
  .on(fetchProductFx.failData, (state, payload) =>
    Object.assign({}, { ...state }, { failed: payload.message })
  );

export const $loading = fetchProductFx.pending;
