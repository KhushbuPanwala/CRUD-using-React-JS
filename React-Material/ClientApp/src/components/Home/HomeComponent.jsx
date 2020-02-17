import React, { Component } from 'react'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import ApiService from '../ApiService';
import '../style.css';
import Carousel from 'react-image-carousel';
import Loader from 'react-loader-spinner'
import NativeSelect from '@material-ui/core/NativeSelect';

class HomeComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            products: [],
            filterProducts: [],
            message: null,
            loading: false,

        }
    }

    componentDidMount() {
        this.getProductDetails();
    }

    categories = [
        { "Key": 0, "value": "All" },
        { "Key": 1, "value": "Baby" },
        { "Key": 2, "value": "Beauty" },
        { "Key": 3, "value": "Books" },
        { "Key": 4, "value": "Car & Motorbike" },
        { "Key": 5, "value": "Clothing & Accessories" },
        { "Key": 6, "value": "Computers & Accessories" },
        { "Key": 7, "value": "Electronics" },
        { "Key": 8, "value": "Furniture" },
        { "Key": 9, "value": "Home & Kitchen" },
        { "Key": 10, "value": "Jewellery" },
        { "Key": 11, "value": "Luggage & Bags" },
        { "Key": 12, "value": "Watches" }
    ];

    images = [
        require('../images/1.jpg'),
        require('../images/2.jpg'),
        require('../images/3.jpg'),
        require('../images/img1.jpg'),
        require('../images/img2.jpg'),
        require('../images/img3.jpg'),
        require('../images/img4.jpg'),
    ];
    getProductDetails() {
        this.setState({ loading: true }, () => {
            ApiService.getAllProductDetails().then(result => {
                result.data.map(item => {
                    item.imageName = item.imageName !== null ? (require('../productImage/' + item.imageName)) : null
                });
                this.setState({
                    products: result.data,
                    filterProducts: result.data,
                    loading: false
                });
            });
        });
    }

    openProductDetail(productId) {
        window.localStorage.setItem("productDetailId", productId);
        this.props.history.push('/product-detail');
    }

    onChange = (e) => {
        let selectedCategory = e.target.value;
        var queryResult = [];
        this.state.products.map(item => {
            if (item.category === selectedCategory) {
                queryResult.push(item);
            }
            if (selectedCategory === "All") {
                queryResult = this.state.products;
            }
        });

        this.setState({
            filterProducts: queryResult
        });
    }
    render() {
        const { loading } = this.state;
        return (
            <React.Fragment>
                {loading ? <Loader type="TailSpin" className="loader-style " height="100" width="100" /> :
                    <div>
                        <div className="my-carousel">
                            <Carousel images={this.images} thumb={true} loop={true} autoplay={4000} />
                        </div>
                        <div>
                            <h2 className="category"> Category
                            <NativeSelect value={this.state.category} onChange={this.onChange} name="category">
                                    {this.categories.map(category => (
                                        <option value={category.value}>{category.value}</option>
                                    ))}
                                </NativeSelect>
                            </h2>

                        </div>

                        <div>
                            {this.state.filterProducts.map(row => (
                                <Card className="root" onClick={() => this.openProductDetail(row.id)}>
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="h5" className="cart-title">
                                            {row.productName}
                                        </Typography>
                                    </CardContent>
                                    <div className="img-div">
                                        <img src={row.imageName} className="card-img" alt="ProductImage" />
                                    </div>
                                </Card>
                            ))}
                        </div>
                    </div>
                }
            </React.Fragment>
        );
    }
}
export default HomeComponent;