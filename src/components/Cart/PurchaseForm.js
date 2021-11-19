import React, { useState } from "react";
import { getFirestore } from "../../firebase/firebaseConfig";
import { cartContext } from "../../context/CartContext";
import "../../css/CartStyle/Form.css";
import { BlackButton } from "../Button/BlackButton";

export const PurchaseForm = () => {
  const { trolley, totalAPagar, terminarPurchase } =
    React.useContext(cartContext);

  const [purchaseFinalization, setPurchaseFinalization] = useState("none");
  const [purchaseNoFinalization, setNoPurchaseFinalization] = useState("block");

  const [yourName, setYourName] = useState("");
  const [number, setNumber] = useState("");
  const [email, setEmail] = useState("");
  const [emailRepeat, setEmailRepeat] = useState("");
  const [direction, setDirection] = useState("");
  const [card, setCard] = useState("");
  const [code, setCode] = useState("");
  const [share, setShare] = useState("");


  const [idPurchase, setIdPurchase] = useState("");
  const shares = [0, 3, 6, 12];

  const finalizePurchase = (ev) => {
    ev.preventDefault();


    const fechPurchase = new Date();
    const total = totalAPagar();

    const newOrder = {
      buyer: {
        email: email,
        emailRepeat: emailRepeat,
        yourName: yourName,
        number: number,
        direction: direction,
        amountOfFee: share,
        codeCard: card,
        securityCode: code,
      },
      items: {
        trolley: [...trolley],
      },
      fechaDePurchase: {
        fecha: fechPurchase.toLocaleString(),
      },
      total: {
        total: total,
      },
    };

    const ordersData = getFirestore();
    const orders = ordersData.collection("purchase");

    orders
      .add(newOrder)
      .then(({ id }) => {
        setIdPurchase(id);
        setEmail("");
        setEmailRepeat("");
        setYourName("");
        setDirection("");
        setNumber("");
        setCard("");
        setCode("");
        setShare("");
        setPurchaseFinalization("block");
        setNoPurchaseFinalization("none");
      })
      .catch((error) => {
        console.error(error);
      });


    const db = getFirestore();
    const ItemsCollection = db.collection("items");
    const batch = getFirestore().batch();

    trolley.forEach((c) => {
      batch.update(ItemsCollection.doc(`${c.item.id}`), {
        stock: c.item.stock - c.cantidad,
      });
    });
    batch
      .commit()
      .then(() => {
        console.log("Termino bien");
        terminarPurchase();
      })
      .catch((err) => console.log(err));
  };

  const [msjError, setMsjError] = useState(false);

  const completarDatos = (ev) => {
    ev.preventDefault();
    setMsjError(true);
  };

  return (
    <>
      <div style={{ display: purchaseNoFinalization }}>
        <div>
          <h1
            style={{
              textAlign: "center",
              textTransform: "uppercase",
              fontWeight: 800,
              margin: "80px 0px",
            }}
          >
            sneakers are almost yours!
          </h1>
          <div id="grid">
            <div className="formImg"></div>
            <form>
              <div className="input">
                <label htmlFor="name">Name:</label>
                <input
                  type="text"
                  name="name"
                  placeholder=" Enter your name"
                  value={yourName}
                  onChange={(evento) => setYourName(evento.target.value)}
                />
              </div>
              <div className="input">
                <label htmlFor="number">Number:</label>
                <input
                  type="number"
                  name="number"
                  placeholder=" Enter your number"
                  value={number}
                  onChange={(evento) => setNumber(evento.target.value)}
                />
              </div>
              <div className="input">
                <label htmlFor="direction">Direction:</label>
                <input
                  type="text"
                  name="direction"
                  placeholder=" Enter your direction"
                  value={direction}
                  onChange={(evento) => setDirection(evento.target.value)}
                />
              </div>
              <div className="input">
                <label htmlFor="email">Email:</label>
                <input
                  type="text"
                  name="email"
                  placeholder=" Enter your email"
                  value={email}
                  onChange={(evento) => setEmail(evento.target.value)}
                />
              </div>
              <div className="input">
                <label htmlFor="emailRepeat">Repeat email:</label>
                <input
                  type="text"
                  name="emailRepeat"
                  placeholder=" Enter your email"
                  value={emailRepeat}
                  onChange={(evento) => setEmailRepeat(evento.target.value)}
                />
              </div>
              <div className="input">
                <div className="inputDoble">
                  <div style={{ padding: "5px" }} className="card-number">
                    <label htmlFor="card" style={{ marginLeft: "10px" }}>
                      Card number:
                    </label>
                    <input
                      type="number"
                      name="card"
                      placeholder=" Card number"
                      value={card}
                      onChange={(evento) => {
                        const codigo = evento.target.value.slice(0, 16);
                        setCard(codigo);
                      }}
                    />
                  </div>
                  <div style={{ padding: "5px" }} className="card-code">
                    <label htmlFor="code" style={{ marginLeft: "10px" }}>
                      Security code:
                    </label>
                    <input
                      type="password"
                      name="code"
                      placeholder=" Code"
                      value={code}
                      onChange={(evento) => {
                        const codigo = evento.target.value.slice(0, 3);
                        setCode(codigo);
                      }}
                    />
                  </div>
                </div>
              </div>
              <div
                className="input"
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <label>Choose amount of payments:</label>
                <select
                  style={{ width: "40%" }}
                  onChange={(e) => {
                    const shareSeleccionada = e.target.value;
                    setShare(shareSeleccionada);
                  }}
                >
                  <option value={""}>Choose</option>
                  {shares.map((c) => (
                    <option key={`key-${c}`} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
            </form>
            <div
              className="botonEnviarForm"
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              {yourName !== "" &&
              number !== "" &&
              email === emailRepeat &&
              direction !== "" &&
              card !== "" &&
              code !== "" &&
              share !== "" ? (
                <input
                  type="submit"
                  value="Sent"
                  className="boton BlackButtonTerminarPurchase"
                  onClick={finalizePurchase}
                  style={{ marginTop: "40px", height: "50px" }}
                />
              ) : (
                <>
                  <input
                    type="submit"
                    value="Sent"
                    className="boton BlackButtonTerminarPurchase"
                    onClick={completarDatos}
                    style={{ marginTop: "40px", height: "50px" }}
                  />
                </>
              )}
            </div>
            {yourName !== "" &&
            number !== "" &&
            email === emailRepeat &&
            direction !== "" &&
            card !== "" &&
            code !== "" &&
            share !== "" ? (
              <div
                className={`msjError ${
                  msjError === false ? "fadeOut2" : "fadeIn2"
                }`}
              >
                <span>check the data please</span>
              </div>
            ) : (
              <div
                className={`msjError ${
                  msjError === false ? "fadeOut" : "fadeIn"
                }`}
              >
                <span>check the data please</span>
              </div>
            )}
          </div>
        </div>
      </div>
      <div
        className="mensajePurchaseRealizada"
        style={{
          display: purchaseFinalization,
          textAlign: "center",
        }}
      >
        <div>
          <div>
            <h2
              style={{
                textAlign: "center",
                textTransform: "uppercase",
                fontWeight: 800,
              }}
            >
              Thanks for your purchase!
            </h2>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "flex-start",
            }}
          >
            <h3>Purchase ID: {idPurchase}</h3>
          </div>

          <div>
            <BlackButton
              text={"View more products"}
              link={"/"}
              submit={"boton BlackButtonTerminarPurchase"}
            />
          </div>
        </div>
      </div>
    </>
  );
};
