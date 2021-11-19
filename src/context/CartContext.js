import React, { useEffect, useState, createContext } from "react";

//Context
export const cartContext = createContext();

export const CartProvider = ({ children }) => {
  const [trolley, settrolley] = useState([]);

  useEffect(() => {
    if (localStorage.getItem("Cart") !== null) {
      settrolley(JSON.parse(localStorage.getItem("Cart")));
    }
  }, []);

  // Local Storage Set
  useEffect(() => {
    localStorage.setItem("Cart", JSON.stringify(trolley));
  }, [trolley]);

  const addItem = (cantidad, talle, itemNuevo) => {
    //El método findIndex() devuelve el índice del primer elemento de un array que cumpla con la función de prueba proporcionada. En caso contrario devuelve -1.

    //Aca hay que tener cuidado, porque el id en el firabesa hay que buscarlo dentro del item, pero dentro de la lista dentro de lista.item
    const findPorId = trolley.findIndex(
      (listaDeItems) => listaDeItems.item.id === itemNuevo.id
    );

    //[...trolley] => sirve para que no se pisen los productos
    if (findPorId === -1) {
      const listaDeItems = [...trolley, { item: itemNuevo, cantidad, talle }];
      settrolley(listaDeItems);
      // console.log("LISTA:", listaDeItems);
    } else {
      const nuevaCantidad = trolley[findPorId].cantidad + cantidad;
      const talles = [trolley[findPorId].talle, talle];
      const nuevoTalle = talles.filter((item, i) => talles.indexOf(item) === i);
      const listaViejaDeItems = trolley.filter(
        (listaViejaDeItems) =>
          listaViejaDeItems.item.yourName !== trolley[findPorId].item.yourName
      );

      const listaDeItems = [
        ...listaViejaDeItems,
        {
          item: trolley[findPorId].item,
          cantidad:
            nuevaCantidad <= itemNuevo.stock ? nuevaCantidad : itemNuevo.stock,
          talle: nuevoTalle,
        },
      ];
      settrolley(listaDeItems);
    }
    // console.log("este es el item", itemNuevo);
    // console.log("este es el trolley", trolley);
  };

  const removeItem = (item) => {
    const nuevaLista = trolley.filter(
      (itemtrolley) => itemtrolley.item.id !== item.item.id
    );
    settrolley(nuevaLista);
    totalAPagar();
  };

  const totalAPagar = () => {
    let total = 0;
    trolley.forEach((item) => (total += item.item.precio * item.cantidad));
    return total;
  };

  //Esta seria clear()
  const terminarPurchase = () => {
    settrolley([]);
  };

  return (
    <>
      <cartContext.Provider
        value={{
          trolley,
          addItem,
          removeItem,
          totalAPagar,
          terminarPurchase,
        }}
      >
        {children}
      </cartContext.Provider>
    </>
  );
};
