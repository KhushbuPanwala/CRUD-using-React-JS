import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { NavMenu } from './NavMenu';

export class Layout extends Component {
    static displayName = Layout.name;
    state = {
        isLogin: false
    }

    componentWillReceiveProps() {
        if (window.location.pathname === "/" || window.location.pathname === "/login"
            || window.location.pathname === "/register-User") {
            this.setState({
                isLogin: false
            });
        }
        else {
            this.setState({
                isLogin: true
            });
        }
    }
    render() {
        const { isLogin } = this.state;
        return (
            <React.Fragment>

                {isLogin ? <div>
                    <NavMenu />
                    <Container>
                        {this.props.children}
                    </Container>
                </div> : <div>
                        <Container>
                            {this.props.children}
                        </Container>
                    </div>
                }
            </React.Fragment>
        );
    }
}
