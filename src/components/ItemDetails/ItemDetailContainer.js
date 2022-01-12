import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { getFirestore } from "../../firebase/firebaseConfig";
import { ItemDetail } from "./ItemDetail";
import { BlackButton } from "../Button/BlackButton";

const ItemDetailContainer = () => {
  const [outOfStock, setOutOfStock] = useState("none");
  const [stock, setStock] = useState("block");

  const [productDetail, setProductDetail] = useState({});
  const { id: idProduct } = useParams();

  useEffect(() => {
    const getDataById = () => {
      const db = getFirestore();
      const itemCollection = db.collection("items");
      const documentSpecific = itemCollection.doc(idProduct);
      documentSpecific
        .get()
        .then((data) => {
          if (data.size === 0) {
            console.log("No Results");
          }
          if (data.data() === undefined) {
            setOutOfStock("block");
            setStock("none");
          }
          
          const detail = data.data();
          setProductDetail(detail);
        })
        .catch((error) => {
          console.error("Error", error);
        });
    };
    getDataById();
  }, [idProduct]);

  return (
    <div>
      <div className="title">
        <h2 className="">Product Details</h2>
      </div>
      <div className="productNotExist" style={{ display: outOfStock }}>
        <h3>This product does not exist</h3>
        <BlackButton
          text={`View other products`}
          link={`/category/all`}
          submit={`button BlackButtonFinishPurchase`}
        />
      </div>
      <div style={{ display: stock }}>
        <ItemDetail item={productDetail} />
      </div>
    </div>
  );
};

export default ItemDetailContainer;
