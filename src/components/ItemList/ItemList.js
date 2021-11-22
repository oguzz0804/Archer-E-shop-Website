import React from "react";
import { Item } from "./Item";
import "../../css/ItemList/CardItem.css";
import { BlackButton } from "../Button/BlackButton";

export const ItemList = ({ items }) => {
  return (
    <>
      {items.length !== 0 ? (
        items.map((item) => <Item key={`generalList-${item.id}`} item={item} />)
      ) : (
        <div style={{ margin: "100px" }}>
          <div className="outOfStockMessage">
            <h3>out of stock</h3>
            <BlackButton text={`View more products`}
              link={`/category/all`}
              submit={`button BlackButtonFinishPurchase`}
            />
          </div>
        </div>
      )}
    </>
  );
};
