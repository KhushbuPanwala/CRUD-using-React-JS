using BusinessEntity.ProductDetail;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BusinessLogic.ProductRepository
{
    public interface IProductDetailRepository
    {
        /// <summary>
        /// Get all product details
        /// </summary>
        /// <returns>list of product details</returns>
        List<ProductDetail> GetProductDetail();

        /// <summary>
        /// Get product details by given id
        /// <param name="id">id of product detail </param>
        /// </summary>
        /// <returns>product details for given id</returns>
        ProductDetail GetProductDetailById(int id);

        /// <summary>
        /// Add new product details 
        /// <param name="model">product detail saved in database</param>
        /// </summary>
        /// <returns>Task</returns>
        bool AddProductDetail(ProductDetail productDetail);

        /// <summary>
        /// Update product details 
        /// <param name="model">updated product detail </param>
        /// </summary>
        /// <returns>Task</returns>
        bool UpdateProductDetail(ProductDetail productDetail);

        /// <summary>
        /// Delete product details 
        /// <param name="id">id of delete product detail </param>
        /// </summary>
        /// <returns>Task</returns>
        bool DeleteProductDetail(int id);
    }

}
