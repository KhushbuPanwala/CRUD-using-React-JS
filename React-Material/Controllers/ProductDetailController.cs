using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using BusinessEntity.ProductDetail;
using BusinessLogic.ProductRepository;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace React_Material
{
    [Route("api/[controller]")]
    public class ProductDetailController : Controller
    {
        public IProductDetailRepository _productDetailRepository;

        public ProductDetailController(IProductDetailRepository productDetailRepository)
        {
            _productDetailRepository = productDetailRepository;
        }

        /// <summary>
        /// Get all product details
        /// </summary>
        /// <returns>list of product details</returns>
        [HttpGet]
        [Route("GetProductDetail")]
        public List<ProductDetail> GetProductDetail()
        {
            return _productDetailRepository.GetProductDetail();
        }

        /// <summary>
        /// Get product details by given id
        /// <param name="id">id of product detail </param>
        /// </summary>
        /// <returns>product details for given id</returns>
        [HttpGet]
        [Route("GetProductDetailById/{id}")]
        public ProductDetail GetProductDetailById(int id)
        {
            return _productDetailRepository.GetProductDetailById(id);
            //return JsonConvert.SerializeObject(_productDetailRepository.GetProductDetailById(id));
        }

        /// <summary>
        /// Add new product details 
        /// <param name="model">product detail saved in database</param>
        /// </summary>
        /// <returns>Task</returns>
        [HttpPost]
        [Route("AddProductDetail")]
        public bool AddProductDetail(ProductDetail productDetail)
        {
            return _productDetailRepository.AddProductDetail(productDetail);
        }

        /// <summary>
        /// Update product details 
        /// <param name="model">updated product detail </param>
        /// </summary>
        /// <returns>Task</returns>
        [HttpPut]
        [Route("UpdateProductDetail")]
        public bool UpdateProductDetail(ProductDetail productDetail)
        {
            return _productDetailRepository.UpdateProductDetail(productDetail);
        }

        /// <summary>
        /// Delete product details 
        /// <param name="id">id of delete product detail </param>
        /// </summary>
        /// <returns>Task</returns>
        [HttpDelete]
        [Route("DeleteProductDetail/{id}")]
        public bool DeleteProductDetail(int id)
        {
            return _productDetailRepository.DeleteProductDetail(id);
        }

        /// <summary>
        /// Upload product image
        /// <param name="id">id of delete product detail </param>
        /// </summary>
        /// <returns>Task</returns>
        [HttpPost]
        [Route("UploadProductImage")]
        public ActionResult UploadProductImage([FromForm]IFormFile fileData)
        {
            try
            {
                byte[] fileBytes;
                using (var memoryStream = new MemoryStream())
                {
                    fileData.CopyToAsync(memoryStream);
                    fileBytes = memoryStream.ToArray();


                }
                var filename = fileData.FileName;
                var contentType = fileData.ContentType;

                string base64String = Convert.ToBase64String(fileBytes, 0, fileBytes.Length);

                byte[] imageBytes = Convert.FromBase64String(base64String);

                //Save the Byte Array as Image File.
                string fullPath = Directory.GetCurrentDirectory() + @"\ClientApp\src\components\productImage\" + fileData.FileName;
                System.IO.File.WriteAllBytes(fullPath, imageBytes);

                return Json(fileData.FileName);

            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
