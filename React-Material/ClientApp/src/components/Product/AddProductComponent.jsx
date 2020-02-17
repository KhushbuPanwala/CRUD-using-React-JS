import React, { Component } from 'react'
import Button from '@material-ui/core/Button';
import qs from 'qs';
import { ToastsContainer, ToastsStore } from 'react-toasts';
import '../style.css';
import ApiService from '../ApiService';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import Select from "@material-ui/core/Select";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Loader from 'react-loader-spinner'

class AddProductComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            productCode: '',
            productName: '',
            description: '',
            category: '',
            price: '',
            quantity: '',
            imageName: '',
            submitted: false,
            loading: false,
        };


    }

    componentDidMount() {
        let id = window.localStorage.getItem("productId");
        if (id !== null) {
            this.getProductDetailsById(id);
        }
    }

    categories = [
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
                    imageName: result.data.imageName,
                    imagePreviewUrl: result.data.imageName != null ? require('../productImage/' + result.data.imageName) : null,
                    loading: false
                });
            });
        });
    }

    cancel = (e) => {
        this.props.history.push('/products');
    }

    saveProduct = (e) => {
        e.preventDefault();
        this.setState({ loading: true }, () => {
            if (this.state.id === undefined) {
                const productDetail = {
                    id: 0,
                    productCode: this.state.productCode,
                    productName: this.state.productName,
                    description: this.state.description,
                    category: this.state.category,
                    price: this.state.price,
                    quantity: this.state.quantity,
                    imageName: this.state.imageName,
                }
                ApiService.addProduct(qs.stringify({ productDetail: productDetail })).then(result => {
                    this.setState({
                        response: result,
                        loading: false
                    })
                    ToastsStore.success("Product Added Successfully !");
                    this.props.history.push('/products');

                });
            }
            else {
                const productDetail = {
                    id: this.state.id,
                    productCode: this.state.productCode,
                    productName: this.state.productName,
                    description: this.state.description,
                    category: this.state.category,
                    price: this.state.price,
                    quantity: this.state.quantity,
                    imageName: this.state.imageName,
                }
                ApiService.updateProduct(qs.stringify({ productDetail: productDetail })).then(result => {
                    this.setState({
                        response: result,
                        loading: false
                    })
                    ToastsStore.success("Product Updated Successfully !");
                    this.props.history.push('/products');

                });
            }
        });
    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });

    }

    onChangeImage(e) {
        e.preventDefault();

        let reader = new FileReader();
        let file = e.target.files[0];

        reader.onloadend = () => {
            this.setState({
                file: file,
                imagePreviewUrl: reader.result
            });
        }

        reader.readAsDataURL(file)
    }

    uploadImage(e) {
        e.preventDefault();
        const formData = new FormData();
        formData.append('fileData', this.state.file);
        ApiService.uploadProductImage(formData).then(result => {
            this.setState({
                imageName: result.data
            });
            //this.state.imageName = result.data;
            this.saveProduct(e);
        });
    }

    render() {
        const { submitted, loading } = this.state;

        let { imagePreviewUrl } = this.state;
        let $imagePreview = null;
        if (imagePreviewUrl) {
            $imagePreview = (<img src={imagePreviewUrl} className="image-style" alt="ProductImage" />);
        }
        return (
            <React.Fragment>
                {loading ? <Loader type="TailSpin" className="loader-style" height="100" width="100" /> :
                    <div>

                        <div>
                            <ToastsContainer store={ToastsStore} />
                        </div>
                        <div>
                            <h2 className="font-color">Add Product</h2>
                            <ValidatorForm ref={r => (this.form = r)} onSubmit={this.saveProduct} >

                                <TextValidator label="Product Code" type="text" value={this.state.productCode}
                                    name="productCode" onChange={this.onChange} fullWidth
                                    validators={['required']}
                                    errorMessages={['Product Code is required']} />

                                <TextValidator label="Product Name" type="text" value={this.state.productName}
                                    name="productName" onChange={this.onChange} fullWidth
                                    validators={['required']}
                                    errorMessages={['Product Name is required']} />

                                <TextValidator label="Description" type="text" value={this.state.description}
                                    name="description" onChange={this.onChange} fullWidth
                                    validators={['required']}
                                    errorMessages={['Description is required']} />

                                <InputLabel htmlFor="category">Category</InputLabel>
                                <Select
                                    name="category" fullWidth
                                    value={this.state.category} displayEmpty
                                    onChange={this.onChange}
                                    input={<Input id="name" />}>
                                    {this.categories.map(category => (
                                        <MenuItem value={category.value}>{category.value}</MenuItem>
                                    ))}
                                </Select>


                                <TextValidator label="Price" type="text" value={this.state.price}
                                    name="price" onChange={this.onChange} fullWidth
                                    validators={['required']}
                                    errorMessages={['Price is required']} />

                                <TextValidator label="Quantity" type="text" value={this.state.quantity}
                                    name="quantity" onChange={this.onChange} fullWidth
                                    validators={['required']}
                                    errorMessages={['Quantity is required']} />

                                <input className="fileInput" type="file"
                                    onChange={(e) => this.onChangeImage(e)} />
                                <Button className="theme-color m-10" type="submit" onClick={(e) => this.uploadImage(e)}>Upload</Button>
                                <div className="imgPreview"> {$imagePreview} </div>

                                <Button className="theme-color m-10" variant="contained" type="submit" disabled={submitted}>
                                    Save
                        </Button>
                                <Button className="font-color mat-raised-button mr-20" onClick={this.cancel}>Cancel</Button>
                            </ValidatorForm>
                        </div>
                    </div>
                }
            </React.Fragment>
        );
    }
}

export default AddProductComponent;