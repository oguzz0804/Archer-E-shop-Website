import React from "react";
import "../../css/ItemDetail/ItemDetail.css";

//components
import { ItemCount } from "./ItemCount";

//Imagenes
import Cambios from "../../images/logos/cambios.png";
import Tarjetas from "../../images/logos/tarjetas.png";
import Retiro from "../../images/logos/retiro.png";

//Context
import { cartContext } from "../../context/CartContext";

export const ItemDetail = ({ item }) => {
  const { addItem } = React.useContext(cartContext);

  const onAdd = (quantityToAdd, chooseSize) => {
    addItem(quantityToAdd, chooseSize, item);
  };

  return (
    <React.Fragment>
      {item !== undefined ? (
        <div className="myContainerGeneral" key={`item-${item.id}`}>
          <div className="myContainer-imagen">
            <img
              src={item.imgUrl}
              alt={item.nombre}
              className="myContainer__imagen"
            />
          </div>
          <div className="myContainer-details">
            <div className="details-title">
              <h2>{item.nombre}</h2>
              <h3>$ {item.precio}</h3>
            </div>
            <ItemCount
              precio={item.precio}
              talle={item.talle}
              initial="1"
              stock={item.stock}
              onAdd={onAdd}
            />
            <div className="myContainer-tarjetas">
              <div className="contenido-tarjetas">
                <img src={Tarjetas} alt="tarjetas disponibles" />
                <p>All credit cards</p>
              </div>
              <div className="contenido-tarjetas">
                <img src={Cambios} alt="cambios" />
                <p>Free changes</p>
              </div>
              <div className="contenido-tarjetas">
                <img src={Retiro} alt="cambios" />
                <p>Pick up at store</p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </React.Fragment>
  );
};
