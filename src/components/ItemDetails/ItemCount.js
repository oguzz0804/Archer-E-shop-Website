import React, { useState } from "react";
import { ChooseSize } from "./ChooseSize";
import { BlackButton } from "../Button/BlackButton";

export const ItemCount = (props) => {
  //Desestructuracion del props
  const { talle, initial, stock, onAdd } = props;

  const [fade, setFade] = useState(false);
  const [myObject, setMyObject] = useState({
    amountSeleccionada: parseInt(initial),
    stockDisponible: parseInt(stock),
    chooseSize: 0,
  });

  //Desestructuracion del state de ItemCount
  const { amountSeleccionada, stockDisponible, chooseSize } = myObject;

  const reduceProductQuantity = (amount) => {
    if (amount === 1) {
      amount = 1;
    } else if (amount === 0) {
      amount = 0;
    } else {
      amount -= 1;
    }
    setMyObject({ ...myObject, amountSeleccionada: amount });
  };

  const addProductQuantity = (amount, stock) => {
    amount < stock && stock !== 0 ? (amount += 1) : (amount = stock);
    setMyObject({ ...myObject, amountSeleccionada: amount });
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

  const talleSelect = (talle) => {
    setMyObject({ ...myObject, chooseSize: talle });
  };

  const [trolleyContenedor, settrolleyContenedor] = useState("block");
  const [buttonTrolley, setButtonTrolley] = useState("none");

  //Funcion para el trolley y que valida onAdd y hace aparecer ver trolley
  const addProductToCart = (stock, amount, chooseSize) => {
    if (chooseSize !== 0) {
      let amountDeProductosSeleccionados = amount;
      onAdd(amountDeProductosSeleccionados, chooseSize);
      setButtonTrolley("block");
      settrolleyContenedor("none");
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
      <div style={{ display: trolleyContenedor }}>
        <div className="myContainer-talle">
          <p>Choose your size:</p>
          <ChooseSize talle={talle} talleSelect={talleSelect} />
        </div>
        <div className="myContainer-buttones">
          <div className="buttonesCantGral">
            <button
              className="cant-button"
              onClick={() => reduceProductQuantity(amountSeleccionada)}
            >
              -
            </button>
            <span className="button-span">
              {productStock(amountSeleccionada, stockDisponible)}
            </span>
            <button
              className="cant-button"
              onClick={() =>
                addProductQuantity(amountSeleccionada, stockDisponible)
              }
            >
              +
            </button>
          </div>
          <div className="buttonPurchaserGral">
            <button
              onClick={() =>
                addProductToCart(
                  stockDisponible,
                  amountSeleccionada,
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
