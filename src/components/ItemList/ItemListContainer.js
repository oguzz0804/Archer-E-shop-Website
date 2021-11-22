import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import "../../css/Product.css";
import { getFirestore } from "../../firebase/firebaseConfig";
import { Spinner } from "react-bootstrap";
import { ItemList } from "./ItemList";

const ItemListContainer = () => {
  const [products, setProducts] = useState([]);
  const { categoryId: productCategory } = useParams();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getInfo = () => {
      setLoading(true);
      const db = getFirestore();
      const itemCollection = db.collection("items");
      itemCollection
        .get()
        .then((informationBaseData) => {
          if (informationBaseData.size === 0) {
            console.log("No Results");
          }
          setLoading(false);
          const products = informationBaseData.docs.map((doc) => {
            return { id: doc.id, ...doc.data() };
          });
          if (productCategory) {
            const filterProducts = products.filter(
              (item) => item.category === productCategory
            );
            setProducts(filterProducts);
          } else {
            setProducts(products);
          }
        })
        .catch((error) => {
          console.error("Failed to bring products", error);
        });
    };
    getInfo();
  }, [productCategory]);

  return (
    <React.Fragment>
      <div className="title">
        <h2>EXPLORE OUR PRODUCTS</h2>
      </div>
      {loading === false ? (
        <div className="productContainer">
          <ItemList items={products} />
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            margin: "100px",
          }}
        >
          <Spinner animation="border" />
        </div>
      )}
    </React.Fragment>
  );
};

export default ItemListContainer;
