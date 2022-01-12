import React from "react";
import "../../css/ItemDetail/ItemDetail.css";
import { ItemCount } from "./ItemCount";
import Change from "../../images/logos/change.png";
import Credit from "../../images/logos/credit.png";
import Store from "../../images/logos/store.png";
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
          <div className="myContainer-image">
            <img
              src={item.imgUrl}
              alt={item.productName}
            />
          </div>
          <div className="myContainer-details">
            <div className="details-title">
              <h2>{item.productName}</h2>
              <h3>$ {item.price}</h3>
            </div>
            <ItemCount
              price={item.price}
              mySize={item.mySize}
              initial="1"
              stock={item.stock}
              onAdd={onAdd}
            />
            <div className="myContainer-cards">
              <div className="content-cards">
                <img src={Credit} alt="card not available" />
                <p>All credit cards</p>
              </div>
              <div className="content-cards">
                <img src={Change} alt="Not available" />
                <p>Free changes</p>
              </div>
              <div className="content-cards">
                <img src={Store} alt="Not available" />
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
