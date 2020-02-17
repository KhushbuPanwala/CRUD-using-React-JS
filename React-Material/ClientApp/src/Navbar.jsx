import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import './nav-bar.css';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import ExitToAppOutlinedIcon from '@material-ui/icons/ExitToAppOutlined';

const handleRouting = (route) => {
    let path = window.location.origin.concat('/login');

    if (route === 'Login') {
        path = window.location.origin.concat('/login');
    }
    else if (route === 'Home') {
        path = window.location.origin.concat('/home');
    }
    else if (route === 'User') {
        path = window.location.origin.concat('/users');
    }
    else if (route === 'Product') {
        path = window.location.origin.concat('/products');
    }
    else if (route === 'Cart') {
        path = window.location.origin.concat('/carts');
    }
    else if (route === 'Logout') {
        path = window.location.origin.concat('/login');
    }
    else {
        path = window.location.origin.concat('/');
    }

    if (window.location.href !== path) {
        window.location.href = path;
    }
}

const NavBar = () => {


    return (
        <div>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="Menu">
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" className="h6-style">
                        Shopping Application
                    </Typography>
                    <Button color="inherit" onClick={() => handleRouting('Home')}>Home</Button>
                    <Button color="inherit" onClick={() => handleRouting('User')}>User</Button>
                    <Button color="inherit" onClick={() => handleRouting('Product')}>Product</Button>
                    <Button color="inherit" onClick={() => handleRouting('Cart')}><ShoppingCartOutlinedIcon className="icon-size" /></Button>
                    <Button color="inherit" onClick={() => handleRouting('Logout')}><ExitToAppOutlinedIcon className="icon-size" /></Button>
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default NavBar;
