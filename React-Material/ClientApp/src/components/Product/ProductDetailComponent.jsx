import React, { Component } from 'react'
import Button from '@material-ui/core/Button';
import { ToastsContainer, ToastsStore } from 'react-toasts';
import ApiService from '../ApiService';
import qs from 'qs';
import ReactImageMagnify from 'react-image-magnify';
import '../style.css';
import Loader from 'react-loader-spinner'

class ProductDetailComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            cartDetail: [],
            id: null,
            productCode: '',
            productName: '',
            description: '',
            category: '',
            price: '',
            quantity: '',
            imageName: '',
        };
    }

    componentDidMount() {
        let id = window.localStorage.getItem("productDetailId");
        if (id !== 0) {
            this.getProductDetailsById(id);
        }
    }

    getProductDetailsById(id) {
        this.setState({ loading: true }, () => {
            ApiService.getProductDetailById(Number(id)).then(result => {
                this.setState({
                    id: result.data.id,
                    productCode: result.data.productCode,
                    productName: result.data.productName,
                    description: result.data.description,
                    category: result.data.category,
                    price: result.data.price,
                    quantity: result.data.quantity,
                    imageName: result.data.imageName != null ? require('../productImage/' + result.data.imageName) : null,
                    loading: false
                });
            });
        });
    }

    addToCart() {
        this.setState({ loading: true }, () => {
            //let userId = window.localStorage.getItem("loginId");
            this.state.cartDetail.userId = Number(window.localStorage.getItem("loginId"));
            this.state.cartDetail.productId = this.state.id;
            this.state.cartDetail.productName = this.state.productName;
            this.state.cartDetail.quantity = this.state.quantity;
            this.state.cartDetail.price = this.state.price * this.state.quantity;

            ApiService.addCartDetail(qs.stringify({ cartDetail: this.state.cartDetail })).then(result => {
                this.setState({
                    response: result,
                    loading: false
                })
                ToastsStore.success("Product Added in Cart Successfully !");
            });
        });

    }

    plus() {
        if (this.state.quantity < 50) {
            this.setState({
                quantity: this.state.quantity + 1
            });
        }
    }

    minus() {
        if (this.state.quantity > 1) {
            this.setState({
                quantity: this.state.quantity - 1
            });
        }
    }

    continueShopping() {
        this.props.history.push('/home');
    }

    render() {
        const { loading } = this.state;

        return (
            <React.Fragment >
                {loading ? <Loader type="TailSpin" className="loader-style " height="100" width="100" /> :
                    <div>
                        <div>
                            <ToastsContainer store={ToastsStore} />
                        </div>

                        <div className="row">
                            <div className="column1">
                                <React.Fragment>
                                    <ReactImageMagnify {...{
                                        smallImage: {
                                            alt: this.state.productName,
                                            isFluidWidth: true,
                                            src: this.state.imageName,
                                        },
                                        largeImage: {
                                            src: this.state.imageName,
                                            width: 1500,
                                            height: 1500
                                        }
                                    }} />

                                </React.Fragment>
                            </div>

                            <div className="column2">
                                <h1 className="title">{this.state.productName}</h1>
                                <div>
                                    <span className="txt-color"> Description </span>
                                    <br />
                                    <p className="detail-txt">
                                        {this.state.description}
                                    </p>
                                </div>

                                <div>
                                    <span className="txt-color">Price </span>
                                    <p className="detail-txt"> {this.state.price}</p>
                                </div>
                                <div>
                                    <span className="txt-color">Total Price</span>
                                    <p className="detail-txt"> {this.state.price * this.state.quantity}</p>
                                </div>
                                <div>
                                    <span className="txt-color">Quantity </span> <br />
                                    <Button className="qty-btn" onClick={() => this.minus()}>-</Button>
                                    <input type="number" margin="normal" name="quantity" className="qty-text" value={this.state.quantity} />
                                    <Button className="qty-btn" onClick={() => this.plus()}>+</Button>
                                </div>

                                <Button className="theme-color mr-20 btn-style" onClick={() => this.continueShopping()}> Contiue Shopping</Button>
                                <Button className="theme-color mr-20 btn-style" onClick={() => this.addToCart()}> Add Cart</Button>

                            </div>
                        </div>
                    </div>
                }
            </React.Fragment >

        );
    }

}

export default ProductDetailComponent;