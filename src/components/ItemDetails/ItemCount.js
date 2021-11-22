import React, { useState } from "react";
import { ChooseSize } from "./ChooseSize";
import { BlackButton } from "../Button/BlackButton";

export const ItemCount = (props) => {
  const { mySize, initial, stock, onAdd } = props;

  const [fade, setFade] = useState(false);
  const [myObject, setMyObject] = useState({
    selectedAmount: parseInt(initial),
    availableStock: parseInt(stock),
    chooseSize: 0,
  });

  const { selectedAmount, availableStock, chooseSize } = myObject;

  const reduceProductQuantity = (amount) => {
    if (amount === 1) {
      amount = 1;
    } else if (amount === 0) {
      amount = 0;
    } else {
      amount -= 1;
    }
    setMyObject({ ...myObject, selectedAmount: amount });
  };

  const addProductQuantity = (amount, stock) => {
    amount < stock && stock !== 0 ? (amount += 1) : (amount = stock);
    setMyObject({ ...myObject, selectedAmount: amount });
  };

  const productStock = (amount, stock) => {
    if (stock !== 0) {
      return amount;
    } else if (amount === 0 && stock !== 0) {
      return (amount = 1);
    } else {
      amount = "No stock";
      return amount;
    }
  };

  const selectSize = (mySize) => {
    setMyObject({ ...myObject, chooseSize: mySize });
  };

  const [trolleyContainer, setTrolleyContainer] = useState("block");
  const [buttonTrolley, setButtonTrolley] = useState("none");

  const addProductToCart = (stock, amount, chooseSize) => {
    if (chooseSize !== 0) {
      let selectedProductsAmount = amount;
      onAdd(selectedProductsAmount, chooseSize);
      setButtonTrolley("block");
      setTrolleyContainer("none");
      setTimeout(() => {
        setFade(true);
      }, 50);
    } else if (stock === 0) {
      alert("No stock");
    } else {
      alert("Select your size please");
    }
  };

  return (
    <>
      <div style={{ display: trolleyContainer }}>
        <div className="myContainer-mySize">
          <p>Choose your size:</p>
          <ChooseSize mySize={mySize} selectSize={selectSize} />
        </div>
        <div className="myContainer-buttons">
          <div>
            <button
              className="count-button"
              onClick={() => reduceProductQuantity(selectedAmount)}
            >
              -
            </button>
            <span className="button-span">
              {productStock(selectedAmount, availableStock)}
            </span>
            <button
              className="count-button"
              onClick={() =>
                addProductQuantity(selectedAmount, availableStock)
              }
            >
              +
            </button>
          </div>
          <div>
            <button
              onClick={() =>
                addProductToCart(
                  availableStock,
                  selectedAmount,
                  chooseSize
                )
              }
              className="purchaseButton"
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>
      <div
        className={`myContainer-summarize ${
          fade === false ? "fadeOut" : "fadeIn"
        }`}
        style={{ display: buttonTrolley }}
      >
        <h4>Add to cart!</h4>
        <BlackButton
          text={`View cart`}
          link={`/cart`}
          submit={`summarize-button`}
        />
      </div>
    </>
  );
};
