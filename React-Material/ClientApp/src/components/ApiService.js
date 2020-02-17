import axios from 'axios';

//User Detail
const getAllUserDetailsUrl = "/api/UserDetail/GetUserDetails";
const getUserDetailByIdUrl = "/api/UserDetail/GetUserDetailsById";
const addUserDetailByIdUrl = "/api/UserDetail/AddUserDetail";
const updateUserDetailUrl = "/api/UserDetail/UpdateUserDetail";
const deleteUserDetailUrl = "/api/UserDetail/DeleteUserDetails";

//Product Detail
const getAllProductDetailsUrl = "/api/ProductDetail/GetProductDetail";
const getProductDetailByIdUrl = "/api/ProductDetail/GetProductDetailById";
const addProductDetailByIdUrl = "/api/ProductDetail/AddProductDetail";
const updateProductDetailUrl = "/api/ProductDetail/UpdateProductDetail";
const deleteProductDetailUrl = "/api/ProductDetail/DeleteProductDetail";
const uploadProdutcImageUrl = "/api/ProductDetail/UploadProductImage";

//Cart Detail
const getCartDetailUrl = "/api/CartDetail/GetCartDetail";
const addCartDetailUrl = "/api/CartDetail/AddCartDetail";
const updateCartDetailUrl = "/api/CartDetail/UpdateCartDetail";
const deleteCartDetailUrl = "/api/CartDetail/DeleteCartDetail";

const config = {
    headers: {
        'content-type': 'multipart/form-data',
    },
};

class ApiService {


    //Login /Authentication 
    login(userId) {
        localStorage.setItem('currentUser', JSON.stringify(userId));
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }

    //User Detail
    getUserDetails() {
        return axios.get(getAllUserDetailsUrl);
    }

    getUserDetailById(id) {
        return axios.get(getUserDetailByIdUrl + '/' + id);
    }

    addUser(userDetail) {
        return axios.post("" + addUserDetailByIdUrl, userDetail);
    }

    updateUser(userDetail) {
        return axios.put(updateUserDetailUrl, userDetail);
    }

    deleteUser(id) {
        return axios.delete(deleteUserDetailUrl + '/' + id);
    }

    //Product Detail
    getAllProductDetails() {
        return axios.get(getAllProductDetailsUrl);
    }

    getProductDetailById(id) {
        return axios.get(getProductDetailByIdUrl + '/' + id);
    }

    addProduct(productDetail) {
        return axios.post("" + addProductDetailByIdUrl, productDetail);
    }

    updateProduct(productDetail) {
        return axios.put(updateProductDetailUrl, productDetail);
    }

    deleteProduct(id) {
        return axios.delete(deleteProductDetailUrl + '/' + id);
    }

    uploadProductImage(uploadData) {
        return axios.post("" + uploadProdutcImageUrl, uploadData, config);
    }

    //cart Detail
    getCartDetail(id) {
        return axios.get(getCartDetailUrl + '/' + id);
    }

    addCartDetail(cartDetail) {
        return axios.post("" + addCartDetailUrl, cartDetail);
    }

    updateCartDetail(cartDetail) {
        return axios.put(updateCartDetailUrl, cartDetail);
    }

    deleteCartDetail(id) {
        return axios.delete(deleteCartDetailUrl + '/' + id);
    }
}

export default new ApiService();