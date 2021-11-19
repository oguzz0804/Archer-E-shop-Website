import React from "react";
import { Link } from "react-router-dom";
import { BlackButton } from "../Button/BlackButton";
import "../../css/ItemList/CardItem.css";

export const Item = ({ item }) => {
  const { id, yourName, precio, imgUrl, stock } = item;

  const stockDisponible = (stock) => {
    if (stock !== 0) {
      return "green";
    } else {
      return "red";
    }
  };

  return (
    <div className="container-itemCard" id={id}>
      <Link to={`/item/${id}`}>
        <img className="itemCard-img" src={imgUrl} alt={yourName} />
      </Link>
      <div className="itemCard-containerDetails">
        <h3>{yourName}</h3>
        <span>Price: ${precio}</span>
        <span style={{ color: stockDisponible(stock) }}>
          {stock !== 0 ? "Available stock" : "No stock"}
        </span>
        <BlackButton
          text={`View details`}
          link={`/item/${item.id}`}
          submit={`home-boton`}
        />
      </div>
    </div>
  );
};
