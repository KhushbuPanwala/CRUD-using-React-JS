using BusinessEntity.CartDetail;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;

namespace BusinessLogic.CartRepository
{
    public class CartDetailRepository : ICartDetailRepository
    {
        string path = "";
        public CartDetailRepository()
        {
            path = Directory.GetCurrentDirectory() + @"\ClientApp\src" + @"\CartDetail.json";
        }

        /// <summary>
        /// Get all Cart details
        /// </summary>
        /// <returns>list of Cart detail</returns>
        private List<CartDetail> GetAllCartDetail()
        {
            List<CartDetail> CartDetails = new List<CartDetail>();
            using (StreamReader r = new StreamReader(path))
            {
                string json = r.ReadToEnd();
                CartDetails = JsonConvert.DeserializeObject<List<CartDetail>>(json);
            }
            return CartDetails.ToList();
        }

        /// <summary>
        /// Get Cart details by given id
        /// <param name="id">id of Cart detail </param>
        /// </summary>
        /// <returns>list of Cart details for given id</returns>
        public List<CartDetail> GetCartDetail(int id)
        {
            List<CartDetail> CartDetails = GetAllCartDetail();
            List<CartDetail> CartDetail = CartDetails.Where(a => a.UserId == id).ToList();
            return CartDetail.ToList();
        }

        /// <summary>
        /// Delete Cart details 
        /// <param name="id">id of delete Cart detail </param>
        /// </summary>
        /// <returns>Task</returns>
        public bool AddCartDetail(CartDetail CartDetail)
        {
            try
            {
                List<CartDetail> CartDetailList = GetAllCartDetail();
                int id = 1;
                if (CartDetailList.Count > 0)
                {
                    id = CartDetailList.Last().Id;
                    id++;
                }

                CartDetail.Id = id;
                CartDetailList.Add(CartDetail);
                string CartData = JsonConvert.SerializeObject(CartDetailList);

                System.IO.File.WriteAllText(path, CartData);
                return true;
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        /// <summary>
        /// Update Cart details 
        /// <param name="model">updated Cart detail </param>
        /// </summary>
        /// <returns>Task</returns>
        public bool UpdateCartDetail(CartDetail cartDetail)
        {
            try
            {
                List<CartDetail> CartDetailList = GetAllCartDetail();

                CartDetailList[CartDetailList.FindIndex(a => a.ProductId == cartDetail.ProductId
                && a.UserId == cartDetail.UserId)] = cartDetail;

                string CartData = JsonConvert.SerializeObject(CartDetailList);
                System.IO.File.WriteAllText(path, CartData);
                return true;
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        /// <summary>
        /// Add new Cart details 
        /// <param name="model">Cart detail saved in database</param>
        /// </summary>
        /// <returns>Task</returns>
        public bool DeleteCartDetail(int id)
        {
            try
            {
                List<CartDetail> CartDetailList = GetAllCartDetail();
                CartDetail CartDetail = CartDetailList.Where(a => a.Id == id).FirstOrDefault();
                bool isDeleted = CartDetailList.Remove(CartDetail);
                string CartData = JsonConvert.SerializeObject(CartDetailList);
                System.IO.File.WriteAllText(path, CartData);
                return isDeleted;
            }
            catch (Exception e)
            {
                throw e;
            }
        }


    }
}
