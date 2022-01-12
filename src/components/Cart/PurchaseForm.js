import React, { useState } from "react";
import { getFirestore } from "../../firebase/firebaseConfig";
import { cartContext } from "../../context/CartContext";
import "../../css/CartStyle/Form.css";
import { BlackButton } from "../Button/BlackButton";

export const PurchaseForm = () => {
  const { trolley, totalToPay, finishPurchase } =
    React.useContext(cartContext);

  const [purchaseFinalization, setPurchaseFinalization] = useState("none");
  const [purchaseNoFinalization, setNoPurchaseFinalization] = useState("block");

  const [customerName, setCustomerName] = useState("");
  const [number, setNumber] = useState("");
  const [email, setEmail] = useState("");
  const [emailRepeat, setEmailRepeat] = useState("");
  const [direction, setDirection] = useState("");
  const [card, setCard] = useState("");
  const [code, setCode] = useState("");
  const [installment, setInstallment] = useState("");

  
  const [idPurchase, setIdPurchase] = useState("");
  const installments = [0, 3, 6, 12];

  const finalizePurchase = (ev) => {
    ev.preventDefault();

    //date
    const fetchPurchase = new Date();
    const total = totalToPay();

    const newOrder = {
      buyer: {
        email: email,
        emailRepeat: emailRepeat,
        customerName: customerName,
        number: number,
        direction: direction,
        amountOfFee: installment,
        codeCard: card,
        securityCode: code,
      },
      items: {
        trolley: [...trolley],
      },
      fetchProductInfo: {
        purchaseDate: fetchPurchase.toLocaleString(),
      },
      total: {
        total: total,
      },
    };

    const orderData = getFirestore();
    const orders = orderData.collection("purchase product");
    orders
      .add(newOrder)
      .then(({ id }) => {
        setIdPurchase(id);
        setEmail("");
        setEmailRepeat("");
        setCustomerName("");
        setDirection("");
        setNumber("");
        setInstallment("");
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
        stock: c.item.stock - c.amount,
      });
    });
    batch
      .commit()
      .then(() => {
        console.log("Success");
        finishPurchase();
      })
      .catch((err) => console.log(err));
  };

  const [msjError, setMsjError] = useState(false);

  const completeData = (ev) => {
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
            confirm order
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
                  value={customerName}
                  onChange={(event) => setCustomerName(event.target.value)}
                />
              </div>
              <div className="input">
                <label htmlFor="number">Number:</label>
                <input
                  type="number"
                  name="number"
                  placeholder=" Enter your number"
                  value={number}
                  onChange={(event) => setNumber(event.target.value)}
                />
              </div>
              <div className="input">
                <label htmlFor="direction">Direction:</label>
                <input
                  type="text"
                  name="direction"
                  placeholder=" Enter your direction"
                  value={direction}
                  onChange={(event) => setDirection(event.target.value)}
                />
              </div>
              <div className="input">
                <label htmlFor="email">Email:</label>
                <input
                  type="text"
                  name="email"
                  placeholder=" Enter your email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
              </div>
              <div className="input">
                <label htmlFor="emailRepeat">Repeat email:</label>
                <input
                  type="text"
                  name="emailRepeat"
                  placeholder=" Enter your email"
                  value={emailRepeat}
                  onChange={(event) => setEmailRepeat(event.target.value)}
                />
              </div>
              <div className="input">
                <div className="doubleEvent">
                  <div style={{ padding: "5px" }} className="card-number">
                    <label htmlFor="card" style={{ marginLeft: "10px" }}>
                      Card number:
                    </label>
                    <input
                      type="number"
                      name="card"
                      placeholder=" Card number"
                      value={card}
                      onChange={(event) => {
                        const cardCode = event.target.value.slice(0, 16);
                        setCard(cardCode);
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
                      onChange={(event) => {
                        const cardCode = event.target.value.slice(0, 3);
                        setCode(cardCode);
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
                    const selectedFee = e.target.value;
                    setInstallment(selectedFee);
                  }}
                >
                  <option value={""}>Choose</option>
                  {installments.map((c) => (
                    <option key={`key-${c}`} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
            </form>
            <div
              className="sendFormButton"
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              {customerName !== "" &&
              number !== "" &&
              email === emailRepeat &&
              direction !== "" &&
              card !== "" &&
              code !== "" &&
              installment !== "" ? (
                <input
                  type="submit"
                  value="Sent"
                  className="button BlackButtonFinishPurchase"
                  onClick={finalizePurchase}
                  style={{ marginTop: "40px", height: "50px" }}
                />
              ) : (
                <>
                  <input
                    type="submit"
                    value="Purchase Product"
                    className="button BlackButtonFinishPurchase"
                    onClick={completeData}
                    style={{ marginTop: "40px", height: "50px" }}
                  />
                </>
              )}
            </div>
            {customerName !== "" &&
            number !== "" &&
            email === emailRepeat &&
            direction !== "" &&
            card !== "" &&
            code !== "" &&
            installment !== "" ? (
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
        className="purchaseCompletedMessage"
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
              submit={"button BlackButtonFinishPurchase"}
            />
          </div>
        </div>
      </div>
    </>
  );
};
