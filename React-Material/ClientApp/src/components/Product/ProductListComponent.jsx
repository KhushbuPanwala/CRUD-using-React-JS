import React, { Component } from 'react'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';
import TextField from '@material-ui/core/TextField';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { ToastsContainer, ToastsStore } from 'react-toasts';
import ApiService from '../ApiService';
import Loader from 'react-loader-spinner'

import '../style.css';

class ProductListComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            products: [],
            filterProducts: [],
            seachValue: '',
            message: null,
            loading: false,

            currentPage: 1,
            itemsPerPage: 10,
            upperPageBound: 5,
            lowerPageBound: 0,
            isPrevBtnActive: 'disabled',
            isNextBtnActive: '',
            pageBound: 3
        }

        this.deleteProduct = this.deleteProduct.bind(this);
        this.editProduct = this.editProduct.bind(this);
        this.addProduct = this.addProduct.bind(this);
        this.getProductDetails = this.getProductDetails.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.btnDecrementClick = this.btnDecrementClick.bind(this);
        this.btnIncrementClick = this.btnIncrementClick.bind(this);
        this.btnNextClick = this.btnNextClick.bind(this);
        this.btnPrevClick = this.btnPrevClick.bind(this);
        this.setPrevAndNextBtnClass = this.setPrevAndNextBtnClass.bind(this);

    }
    componentDidMount() {
        this.getProductDetails();
    }

    getProductDetails() {
        this.setState({ loading: true }, () => {
            ApiService.getAllProductDetails().then(result => {
                this.setState({
                    products: result.data,
                    filterProducts: result.data,
                    loading: false

                });
            });
        });
    }

    deleteProduct(id) {
        confirmAlert({
            title: 'Delete Confirmation',
            message: 'Are you sure to delete this Product???',
            buttons: [{
                label: 'Yes',
                onClick: () => this.delete(id)
            },
            {
                label: 'No'
            }]
        });
    }




    delete(id) {
        this.setState({ loading: true }, () => {
            ApiService.deleteProduct(Number(id)).then(response => response.data).then(result => {
                if (result) {
                    ToastsStore.success("Product Deleted Successfully !");
                    this.setState({
                        loading: false
                    });
                    this.getProductDetails();
                }
                else {
                    this.setState({
                        loading: false
                    });
                }
            });
        });
    }

    editProduct(id) {
        window.localStorage.setItem("productId", id);
        this.props.history.push('/add-product');
    }

    addProduct() {
        window.localStorage.removeItem("productId");
        this.props.history.push('/add-product');

    }

    onChange = (e) => {
        let seachString = e.target.value.toLowerCase();
        this.setState({ [e.target.name]: e.target.value });
        var queryResult = [];
        this.state.products.map(item => {
            if ((item.productCode.indexOf(seachString) !== -1)
                || (item.productName.toLowerCase().indexOf(seachString) !== -1)) {
                queryResult.push(item);
            }
        })
        this.setState({
            filterProducts: queryResult
        })
    }

    //Pagination
    handleClick(event) {
        let listid = Number(event.target.id);
        this.setState({
            currentPage: listid
        });
        //$("ul li.active").removeClass('active');
        //$('ul li#' + listid).addClass('active');
        this.setPrevAndNextBtnClass(listid);
    }

    setPrevAndNextBtnClass(listid) {
        let totalPage = Math.ceil(this.state.filterProducts.length / this.state.itemsPerPage);
        this.setState({ isNextBtnActive: 'disabled' });
        this.setState({ isPrevBtnActive: 'disabled' });
        if (totalPage === listid && totalPage > 1) {
            this.setState({ isPrevBtnActive: '' });
        }
        else if (listid === 1 && totalPage > 1) {
            this.setState({ isNextBtnActive: '' });
        }
        else if (totalPage > 1) {
            this.setState({ isNextBtnActive: '' });
            this.setState({ isPrevBtnActive: '' });
        }
    }

    btnIncrementClick() {
        this.setState({ upperPageBound: this.state.upperPageBound + this.state.pageBound });
        this.setState({ lowerPageBound: this.state.lowerPageBound + this.state.pageBound });
        let listid = this.state.upperPageBound + 1;
        this.setState({ currentPage: listid });
        this.setPrevAndNextBtnClass(listid);
    }

    btnDecrementClick() {
        this.setState({ upperPageBound: this.state.upperPageBound - this.state.pageBound });
        this.setState({ lowerPageBound: this.state.lowerPageBound - this.state.pageBound });
        let listid = this.state.upperPageBound - this.state.pageBound;
        this.setState({ currentPage: listid });
        this.setPrevAndNextBtnClass(listid);
    }

    btnPrevClick() {
        if ((this.state.currentPage - 1) % this.state.pageBound === 0) {
            this.setState({ upperPageBound: this.state.upperPageBound - this.state.pageBound });
            this.setState({ lowerPageBound: this.state.lowerPageBound - this.state.pageBound });
        }
        let listid = this.state.currentPage - 1;
        this.setState({ currentPage: listid });
        this.setPrevAndNextBtnClass(listid);
    }

    btnNextClick() {
        if ((this.state.currentPage + 1) > this.state.upperPageBound) {
            this.setState({ upperPageBound: this.state.upperPageBound + this.state.pageBound });
            this.setState({ lowerPageBound: this.state.lowerPageBound + this.state.pageBound });
        }
        let listid = this.state.currentPage + 1;
        this.setState({ currentPage: listid });
        this.setPrevAndNextBtnClass(listid);
    }

    render() {
        const { filterProducts, currentPage, itemsPerPage, upperPageBound, lowerPageBound, isPrevBtnActive, isNextBtnActive } = this.state;
        const indexOfLastTodo = currentPage * itemsPerPage;
        const indexOfFirstTodo = indexOfLastTodo - itemsPerPage;
        const currentTodos = filterProducts.slice(indexOfFirstTodo, indexOfLastTodo);
        const pageNumbers = [];

        const { loading } = this.state;

        for (let i = 1; i <= Math.ceil(filterProducts.length / itemsPerPage); i++) {
            pageNumbers.push(i);
        }

        const renderPageNumbers = pageNumbers.map(number => {
            if (number === 1 && currentPage === 1) {
                return (
                    <li key={number} className='active' id={number}><a id={number} onClick={this.handleClick}>{number}</a></li>
                )
            }
            else if ((number < upperPageBound + 1) && number > lowerPageBound) {
                return (
                    <li key={number} id={number}><a id={number} onClick={this.handleClick}>{number}</a></li>
                )
            }
        });

        let pageIncrementBtn = null;
        if (pageNumbers.length > upperPageBound) {
            pageIncrementBtn = <li className=''><a onClick={this.handleClick}> &hellip; </a></li>
        }
        let pageDecrementBtn = null;
        if (lowerPageBound >= 1) {
            pageDecrementBtn = <li className=''><a onClick={this.btnDecrementClick}> &hellip; </a></li>
        }
        let renderPrevBtn = null;
        if (isPrevBtnActive === 'disabled') {
            renderPrevBtn = <li className={isPrevBtnActive}><span id="btnPrev"> Previous </span></li>
        }
        else {
            renderPrevBtn = <li className={isPrevBtnActive}><a id="btnPrev" onClick={this.btnPrevClick}> Previous </a></li>
        }

        let renderNextBtn = null;
        if (isNextBtnActive === 'disabled') {
            renderNextBtn = <li className={isNextBtnActive}><span id="btnNext"> Next </span></li>
        }
        else {
            renderNextBtn = <li className={isNextBtnActive}><a id="btnNext" onClick={this.btnNextClick}> Next </a></li>
        }

        return (
            <React.Fragment>
                {loading ? <Loader type="TailSpin" className="loader-style " height="100" width="100" /> :
                    <div>
                        <div>
                            <ToastsContainer store={ToastsStore} />
                        </div>
                        <div>
                            <h2 className="font-color">Product Details</h2>

                            <div className="searchbar">
                                <TextField type="text" placeholder="Search"
                                    className="search-text" name="seachValue"
                                    value={this.state.seachValue} onChange={this.onChange} />
                            </div>

                            <div className="btn-style w-20 pull-right text-right">
                                <Button className="theme-color mr-20 btn-style" onClick={() => this.addProduct()}> Add Product</Button>
                            </div>


                            <Table className="table-style">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Code</TableCell>
                                        <TableCell>Name</TableCell>
                                        <TableCell>Category</TableCell>
                                        <TableCell>Price</TableCell>
                                        <TableCell>Quantity</TableCell>
                                        <TableCell>Edit</TableCell>
                                        <TableCell>Delete</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {currentTodos.map(row => (
                                        <TableRow key={row.id}>
                                            <TableCell>{row.productCode}</TableCell>
                                            <TableCell>{row.productName}</TableCell>
                                            <TableCell>{row.category}</TableCell>
                                            <TableCell>{row.price}</TableCell>
                                            <TableCell>{row.quantity}</TableCell>
                                            <TableCell onClick={() => this.editProduct(row.id)}><CreateIcon className="edit-icon-color" /></TableCell>
                                            <TableCell onClick={() => this.deleteProduct(row.id)}><DeleteIcon className="delete-icon-color" /></TableCell>

                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>

                            <ul className="pagination">
                                {renderPrevBtn}
                                {pageDecrementBtn}
                                {renderPageNumbers}
                                {pageIncrementBtn}
                                {renderNextBtn}
                            </ul>
                        </div>
                    </div>
                }
            </React.Fragment>

        );
    }
}

export default ProductListComponent;

