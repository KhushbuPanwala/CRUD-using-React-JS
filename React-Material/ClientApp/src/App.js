import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import LoginComponent from './components/Login/LoginComponent';
import HomeComponent from './components/Home/HomeComponent';
import UserListComponent from './components/User/UserListComponent';
import ProductListComponent from './components/Product/ProductListComponent';
import AddUserComponent from './components/User/AddUserComponent';
import AddProductComponent from './components/Product/AddProductComponent';
import ProductDetailComponent from './components/Product/ProductDetailComponent';
import CartListComponent from './components/Cart/CartListComponent';
import RegisterUserComponent from './components/Login/RegisterUserComponent';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import './custom.css'

export default class App extends Component {
    render() {
        return (
            <Layout>
                <Route exact path='/' component={LoginComponent} />
                <Route path='/login' component={LoginComponent} />
                <Route path='/register-User' component={RegisterUserComponent} />
                <Route path='/home' component={HomeComponent} />
                <Route path='/users' component={UserListComponent} />
                <Route path='/add-user' component={AddUserComponent} />
                <Route path='/products' component={ProductListComponent} />
                <Route path='/add-product' component={AddProductComponent} />
                <Route path='/product-detail' component={ProductDetailComponent} />
                <Route path='/carts' component={CartListComponent} />
            </Layout>
        );
    }
}


//import React from 'react';
//import NavBar from "./Navbar";
//import AppRouter from "./RouterComponent";
//import Container from '@material-ui/core/Container';

//function App() {
//    return (
//        <div>
//            <NavBar />
//            <Container>
//                <AppRouter />
//            </Container>
//        </div>
//    );
//}

//export default App;
