import React from "react";
import { Link } from "react-router-dom";
import { BlackButton } from "../Button/BlackButton";
import "../../css/ItemList/CardItem.css";

export const Item = ({ item }) => {
  const { id, productName, price, imgUrl, stock } = item;

  const availableStock = (stock) => {
    if (stock !== 0) {
      return "green";
    } else {
      return "red";
    }
  };

  return (
    <div className="container-itemCard" id={id}>
      <Link to={`/item/${id}`}>
        <img className="itemCard-img" src={imgUrl} alt={productName} />
      </Link>
      <div className="itemCard-containerDetails">
        <h3>{productName}</h3>
        <span>Price: ${price} </span>
        <span style={{ color: availableStock(stock) }}>
          {stock !== 0 ? "Available stock" : "No stock"}
        </span>
        <BlackButton
          text={`View details`}
          link={`/item/${item.id}`}
          submit={`home-button`}
        />
      </div>
    </div>
  );
};
