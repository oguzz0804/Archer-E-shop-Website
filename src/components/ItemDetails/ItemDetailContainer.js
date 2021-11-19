import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { getFirestore } from "../../firebase/firebaseConfig";

//components
import { ItemDetail } from "./ItemDetail";
import { BlackButton } from "../Button/BlackButton";

const ItemDetailContainer = () => {
  const [sinStock, setSinStock] = useState("none");
  const [stock, setStock] = useState("block");

  const [productoDetalle, setProductoDetalle] = useState({});
  const { id: idProducto } = useParams();

  useEffect(() => {
    const obtenerDatosById = () => {
      const db = getFirestore();
      const itemCollection = db.collection("items");
      const documentSpecific = itemCollection.doc(idProducto);
      documentSpecific
        .get()
        .then((data) => {
          if (data.size === 0) {
            console.log("No hay resulatdos");
          }
          if (data.data() === undefined) {
            setSinStock("block");
            setStock("none");
          }
          // console.log("data: ", data.data());
          const detalle = data.data();
          setProductoDetalle(detalle);
        })
        .catch((error) => {
          console.error("Error", error);
        });
    };
    obtenerDatosById();
  }, [idProducto]);

  return (
    <div>
      <div className="title">
        <h2 className="">Product Details</h2>
      </div>
      <div className="productoNoExiste" style={{ display: sinStock }}>
        <h3>This product does not exist</h3>
        <BlackButton
          text={`View other products`}
          link={`/category/all`}
          submit={`button BlackButtonFinishPurchase`}
        />
      </div>
      <div style={{ display: stock }}>
        <ItemDetail item={productoDetalle} />
      </div>
    </div>
  );
};

export default ItemDetailContainer;
