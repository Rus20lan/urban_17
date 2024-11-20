import * as chai from "chai";
import { createEvent, createStore } from "effector";
import { fetchProductFx } from "../stores/itemsStore.mjs";
import { describe } from "mocha";
import sinon from "sinon";

const assert = chai.assert;
const expect = chai.expect;

describe("Test store", () => {
  let store;
  beforeEach(function () {
    store = createStore({
      products: [],
      failed: "",
    });
  });
  it("The products property is an array", () => {
    const products = store.getState().products;
    assert(Array.isArray(products), "Products is Array object");
  });
  it("Store contains property 'products'", () => {
    expect(store.getState()).to.have.property("products");
  });
});

describe("Test addItem event", () => {
  let initialState, testObj, handleAddItem;
  beforeEach(function () {
    initialState = {
      products: [],
      failed: "",
    };
    testObj = { title: "test" };
  });
  it('should event "addItem" add store new item', () => {
    const addItemTest = createEvent();
    const store = createStore(initialState).on(addItemTest, (state, payload) =>
      Object.assign(
        {},
        { ...state },
        { products: [...state.products, payload] }
      )
    );

    addItemTest(testObj);

    expect(store.getState().products).to.deep.include.members([
      { title: "test" },
    ]);
  });
});

describe("Test async function", () => {
  const obj = {
    fetchApi: fetchProductFx,
  };
  let stub;
  beforeEach(function () {
    stub = sinon
      .stub(obj, "fetchApi")
      .returns({ completed: true, id: 12, title: "ipsa", userId: 1 });
  });
  it("Stub is function", () => {
    expect(stub).to.be.a("function");
  });

  it("Function fetchApi returns object", () => {
    const result = obj.fetchApi();
    expect(result).to.be.a("object");
  });
  afterEach(() => {
    sinon.restore();
  });
});
