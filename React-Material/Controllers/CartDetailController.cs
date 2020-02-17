using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using BusinessEntity.CartDetail;
using BusinessLogic.CartRepository;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace React_Material
{
    [Route("api/[controller]")]
    public class CartDetailController : Controller
    {
        public ICartDetailRepository _CartDetailRepository;

        public CartDetailController(ICartDetailRepository CartDetailRepository)
        {
            _CartDetailRepository = CartDetailRepository;
        }


        /// <summary>
        /// Get Cart details by given id
        /// <param name="id">id of Cart detail </param>
        /// </summary>
        /// <returns>Cart details for given id</returns>
        [HttpGet]
        [Route("GetCartDetail/{id}")]
        public List<CartDetail> GetCartDetail(int id)
        {
            return _CartDetailRepository.GetCartDetail(id);
        }


        /// <summary>
        /// Add new Cart details 
        /// <param name="model">Cart detail saved in database</param>
        /// </summary>
        /// <returns>Task</returns>
        [HttpPost]
        [Route("AddCartDetail")]
        public bool AddCartDetail(CartDetail CartDetail)
        {
            return _CartDetailRepository.AddCartDetail(CartDetail);
        }

        /// <summary>
        /// Update Cart details 
        /// <param name="model">updated Cart detail </param>
        /// </summary>
        /// <returns>Task</returns>
        [HttpPut]
        [Route("UpdateCartDetail")]
        public bool UpdateCartDetail(CartDetail CartDetail)
        {
            return _CartDetailRepository.UpdateCartDetail(CartDetail);

        }

        /// <summary>
        /// Delete Cart details 
        /// <param name="id">id of delete Cart detail </param>
        /// </summary>
        /// <returns>Task</returns>
        [HttpDelete]
        [Route("DeleteCartDetail/{id}")]
        public bool DeleteCartDetail(int id)
        {
            return _CartDetailRepository.DeleteCartDetail(id);
        }

    }
}
