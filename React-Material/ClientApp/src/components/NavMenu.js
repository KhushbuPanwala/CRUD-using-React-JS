import React, { Component } from 'react';
import { Navbar, NavbarBrand, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import ExitToAppOutlinedIcon from '@material-ui/icons/ExitToAppOutlined';
import './NavMenu.css';

export class NavMenu extends Component {
    render() {
        return (
            <React.Fragment>
                <header className="header">
                    <Navbar>

                        <NavbarBrand tag={Link} to="/home">
                            Shopping Application
                            </NavbarBrand>

                        <ul className="">                        
                            <NavItem>
                                <NavLink tag={Link} to="/home">Home</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink tag={Link} to="/users">Users</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink tag={Link} to="/products">Products</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink tag={Link} to="/carts"><ShoppingCartOutlinedIcon className="icon-size" /></NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink tag={Link} to="/login"><ExitToAppOutlinedIcon className="icon-size" /></NavLink>
                            </NavItem>
                        </ul>
                    </Navbar>
                </header>
            </React.Fragment>
        );
    }
}
