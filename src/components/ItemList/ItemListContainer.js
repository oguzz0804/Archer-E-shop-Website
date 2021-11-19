import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import "../../css/Product.css";
import { getFirestore } from "../../firebase/firebaseConfig";
import { Spinner } from "react-bootstrap";

//components
import { ItemList } from "./ItemList";

const ItemListContainer = () => {
  const [products, setProductos] = useState([]);
  const { categoryId: productCategory } = useParams();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const obtenerDatos = () => {
      setLoading(true);
      const db = getFirestore();
      const itemCollection = db.collection("items");
      itemCollection
        .get()
        .then((informacionBaseDatos) => {
          if (informacionBaseDatos.size === 0) {
            console.log("No Hay resultados");
          }
          // console.log("documentos: ", informacionBaseDatos.docs);
          setLoading(false);
          const products = informacionBaseDatos.docs.map((doc) => {
            return { id: doc.id, ...doc.data() };
          });
          if (productCategory) {
            const filtro = products.filter(
              (item) => item.categoria === productCategory
            );
            setProductos(filtro);
          } else {
            setProductos(products);
          }
        })
        .catch((error) => {
          console.error("Error al traer los contactos", error);
        });
    };
    obtenerDatos();
  }, [productCategory]);

  return (
    <React.Fragment>
      <div className="title">
        <h2>EXPLORE OUR PRODUCTS</h2>
      </div>
      {loading === false ? (
        <div className="containerGralProd">
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
