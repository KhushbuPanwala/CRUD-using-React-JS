using BusinessEntity.CartDetail;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BusinessLogic.CartRepository
{
    public interface ICartDetailRepository
    {
     
        /// <summary>
        /// Get Cart details by given id
        /// <param name="id">id of Cart detail </param>
        /// </summary>
        /// <returns>List of Cart details for given id</returns>
        List<CartDetail> GetCartDetail(int id);

        /// <summary>
        /// Add new Cart details 
        /// <param name="model">Cart detail saved in database</param>
        /// </summary>
        /// <returns>Task</returns>
        bool AddCartDetail(CartDetail CartDetail);

        /// <summary>
        /// Update Cart details 
        /// <param name="model">updated Cart detail </param>
        /// </summary>
        /// <returns>Task</returns>
        bool UpdateCartDetail(CartDetail CartDetail);

        /// <summary>
        /// Delete Cart details 
        /// <param name="id">id of delete Cart detail </param>
        /// </summary>
        /// <returns>Task</returns>
        bool DeleteCartDetail(int id);
    }

}
