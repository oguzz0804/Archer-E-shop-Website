import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NavBar from "./components/Nav/NavBar";
import { IndexPresentation } from "./components/Home/IndexPresentation";
import ItemListContainer from "./components/ItemList/ItemListContainer";
import ItemDetailContainer from "./components/ItemDetails/ItemDetailContainer";
import CardContainer from "./components/Cart/CardContainer";
import Footer from "./components/Footer/Footer";
import { PurchaseForm } from "./components/Cart/PurchaseForm";
import { CartProvider } from "./context/CartContext";

function App() {

  return (

    <Router>

      <CartProvider>
        <NavBar />

        <Switch>

          <Route exact path="/">
            <IndexPresentation />
          </Route>

          <Route exact path="/category/all">
            <ItemListContainer />
          </Route>

          <Route exact path="/category/:categoryId">
            <ItemListContainer />
          </Route>

          <Route exact path="/item/:id">
            <ItemDetailContainer />
          </Route>

          <Route exact path="/cart">
            <CardContainer />
          </Route>

          <Route exact path="/form">
            <PurchaseForm />
          </Route>

        </Switch>
      </CartProvider>
      <Footer />
    </Router>


  );
}

export default App;