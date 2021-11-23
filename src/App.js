import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NavBar from "./components/Nav/NavBar";
import { IndexPresentation } from "./components/Home/IndexPresentation";
import ItemListContainer from "./components/ItemList/ItemListContainer";
import ItemDetailContainer from "./components/ItemDetails/ItemDetailContainer";
import CardContainer from "./components/Cart/CardContainer";
import Footer from "./components/Footer/Footer";
import { PurchaseForm } from "./components/Cart/PurchaseForm";
import LoginPage from "./components/auth/LoginPage.js"
import {AuthProvider} from "./context/AuthContext"
import { CartProvider } from "./context/CartContext";

function App() {
  return (
    <Router>
      <AuthProvider>
      <CartProvider>
        <NavBar />

        <Switch>
          <Route exact path="/">
            <IndexPresentation />
            <ItemListContainer />
          </Route>

          <Route path="/login">
              <LoginPage />
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
      </AuthProvider>
      <Footer />

    </Router>
  );
}

export default App;
