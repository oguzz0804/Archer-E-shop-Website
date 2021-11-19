import React from "react";
import { cartContext } from "../../context/CartContext";
import "../../css/CartStyle/CardContainer.css";

import { BlackButton } from "../Button/BlackButton";

const CardContainer = () => {
  const { trolley, removeItem, totalAPagar } = React.useContext(cartContext);

  return (
    <>
      {trolley.length !== 0 ? (
        <>
          <div className="title">
            <h2>Your Cart</h2>
            <div className="subrayado"></div>
          </div>
          <table>
            <thead>
              <tr className="trContenido trTitulos">
                <th className="t-img">Item</th>
                <th></th>
                <th className="t-talles">Sizes</th>
                <th className="t-cant">Quantity</th>
                <th className="t-precio">Price</th>
              </tr>
            </thead>
            <tfoot>
              {trolley.map((item) => (
                <tr
                  className="trContenido"
                  key={`producto${item.item.id}`}
                  id={item.item.id}
                >
                  <td className="t-img">
                    <img src={item.item.imgUrl} alt={`img-${item.item.id}`} />
                  </td>
                  <td className="t-nombre">{item.item.nombre}</td>
                  <td className="t-talles">
                    {/*Se utiliza para mapear un props.children*/}
                    {React.Children.map(item.talle, (t) => {
                      return <span key={`talle-${t}`}>{t}</span>;
                    })}
                  </td>
                  <td className="t-amount">
                    {item.amount}
                    {item.amount !== 1 ? " products" : " product"}
                  </td>
                  <td className="t-precio">
                    <span>$ {item.item.precio}</span>
                    <button
                      onClick={() => removeItem(item)}
                      className="button buttonRojo"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tfoot>
          </table>
          <div className="trolley-finishPurchase">
            <span>Total: $ {totalAPagar()}</span>
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
            <div className="subrayado"></div>
            <div style={{ marginTop: "20px" }}>
              <BlackButton
                text={`View products`}
                link={`/category/all`}
                submit={`button BlackButtonVolverAProd`}
              />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default CardContainer;
