import React from "react";
import { cartContext } from "../../context/CartContext";
import "../../css/CartStyle/CardContainer.css";
import { BlackButton } from "../Button/BlackButton";

const CardContainer = () => {
  const { trolley, removeItem, totalToPay } = React.useContext(cartContext);

  return (
    <>
      {trolley.length !== 0 ? (
        <>
          <div className="title">
            <h2>Your Cart</h2>
            <div className="underlined"></div>
          </div>
          <table>
            <thead>
              <tr className="contents titles">
                <th className="t-img">Item</th>
                <th></th>
                <th className=" t-size">Sizes</th>
                <th className=" t-quantity">Quantity</th>
                <th className="t-price">Price</th>
              </tr>
            </thead>
            <tfoot>
              {trolley.map((item) => (
               
                <tr
                  className="contents"
                  key={`product${item.item.id}`}
                  id={item.item.id}
                >
                  <td className="t-img">
                    <img src={item.item.imgUrl} alt={`img-${item.item.id}`} />
                  </td>
                  <td className="t-productName">{item.item.productName}</td>
                  <td className=" t-size">
             
                    {React.Children.map(item.mySize, (t) => {
                      return <span key={`mySize-${t}`}>{t}</span>;
                      
                    })}
                  </td>
                  <td className="t-amount">
                    {item.amount}
                    {item.amount !== 1 ? " products" : " product"}
                  </td>
                  <td className="t-price">
                    <span>$ {item.item.price}</span>
                    <button
                      onClick={() => removeItem(item)}
                      className="button buttonRed"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tfoot>
          </table>
          <div className="trolley-finishPurchase">
            <span>Total: $ {totalToPay()}</span>
            <BlackButton
              text={`Finish your purchase`}
              link={`/form`}
              submit={`button BlackButtonFinishPurchase`}
            />
          </div>
        </>
      ) : (
        <>
          <div className="title" style={{ margin: "100px 0" }}>
            <h2>Your cart is empty</h2>
            <div className="underlined"></div>
            <div style={{ marginTop: "20px" }}>
              <BlackButton
                text={`View products`}
                link={`/category/all`}
                submit={`button BlackButtonBack`}
              />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default CardContainer;
