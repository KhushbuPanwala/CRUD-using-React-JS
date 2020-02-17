import React from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import LoginComponent from "./components/Login/LoginComponent";
import UserListComponent from "./components/User/UserListComponent";
import AddUserComponent from "./components/User/AddUserComponent";
import ProductListComponent from './components/Product/ProductListComponent';
import AddProductComponent from './components/Product/AddProductComponent';
import CartListComponent from "./components/Cart/CartListComponent";
import HomeComponent from "./components/Home/HomeComponent";
import ProductDetailComponent from "./components/Product/ProductDetailComponent";

const AppRouter = () => {

    return (
        <div>
            <Router>
                <Switch>
                    <Route path="/" exact component={LoginComponent} />
                    <Route path="/login" component={LoginComponent} />
                    <Route path="/logout" component={LoginComponent} />

                    <Route path="/home" component={HomeComponent} />

                    <Route path="/users" exact component={UserListComponent} />
                    <Route path="/add-user" component={AddUserComponent} />

                    <Route path="/products" exact component={ProductListComponent} />
                    <Route path="/add-product" component={AddProductComponent} />
                    <Route path="/product-detail" component={ProductDetailComponent} />

                    <Route path="/carts" component={CartListComponent} />

                </Switch>
            </Router>
        </div>
    )
}

export default AppRouter;