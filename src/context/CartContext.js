import React, { useEffect, useState, createContext } from "react";

export const cartContext = createContext();

export const CartProvider = ({ children }) => {
  const [trolley, settrolley] = useState([]);

  useEffect(() => {
    if (localStorage.getItem("Cart") !== null) {
      settrolley(JSON.parse(localStorage.getItem("Cart")));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("Cart", JSON.stringify(trolley));
  }, [trolley]);

  const addItem = (amount, mySize, newItem) => {
    const findById = trolley.findIndex(
      (itemsList) => itemsList.item.id === newItem.id
    );
      console.log(findById);
    if (findById === -1) {
      const itemsList = [...trolley, { item: newItem, amount, mySize }];
      settrolley(itemsList);
      
    } else {
      const newQuantity = trolley[findById].amount + amount;
      const sizes = [trolley[findById].mySize, mySize];
      const newSize = sizes.filter((item, i) => sizes.indexOf(item) === i);
      const oldItemsList = trolley.filter(
        (oldItemsList) =>
          oldItemsList.item.productName !== trolley[findById].item.productName
      );

      const itemsList = [
        ...oldItemsList,
        {
          item: trolley[findById].item,
          amount:
            newQuantity <= newItem.stock ? newQuantity : newItem.stock,
          mySize: newSize,
        },
      ];
      settrolley(itemsList);
    }
 
  };

  const removeItem = (item) => {
    const newList = trolley.filter(
      (itemtrolley) => itemtrolley.item.id !== item.item.id
    );
    settrolley(newList);
    totalToPay();
  };

  const totalToPay = () => {
    let total = 0;
    trolley.forEach((item) => (total += item.item.price * item.amount));
    return total;
  };

  const finishPurchase = () => {
    settrolley([]);
  };

  return (
    <>
      <cartContext.Provider
        value={{
          trolley,
          addItem,
          removeItem,
          totalToPay,
          finishPurchase,
        }}
      >
        {children}
      </cartContext.Provider>
    </>
  );
};
