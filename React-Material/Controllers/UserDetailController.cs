using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using BusinessEntity.UserDetail;
using BusinessLogic.UserRepository;
using Microsoft.AspNetCore.Mvc;

namespace React_Material
{
    [Route("api/[controller]")]
    public class UserDetailController : Controller
    {
        public IUserRepository _userDetailRepository;

        public UserDetailController(IUserRepository userDetailRepository)
        {
            _userDetailRepository = userDetailRepository;
        }

        /// <summary>
        /// Get all user details
        /// </summary>
        /// <returns>list of user details</returns>
        [HttpGet]
        [Route("GetUserDetails")]
        public List<UserDetail> GetUserDetail()
        {
            return _userDetailRepository.GetAllUserDetail();
        }

        /// <summary>
        /// Get user details by given id
        /// <param name="id">id of user detail </param>
        /// </summary>
        /// <returns>user details for given id</returns>
        [HttpGet]
        [Route("GetUserDetailsById/{id}")]
        public UserDetail GetUserById(int id)
        {
            return _userDetailRepository.GetUserDetailById(id);
        }

        /// <summary>
        /// Add new user details 
        /// <param name="model">user detail saved in database</param>
        /// </summary>
        /// <returns>Task</returns>
        [HttpPost]
        [Route("AddUserDetail")]
        public bool AddUserDetail(UserDetail userDetail)
        {
            return _userDetailRepository.AddUserDetail(userDetail);

        }

        ///// <summary>
        ///// Update user details 
        ///// <param name="model">updated user detail </param>
        ///// </summary>
        ///// <returns>bool</returns>
        [HttpPut]
        [Route("UpdateUserDetail")]
        public bool UpdateUserDetail(UserDetail userDetail)
        {
            return _userDetailRepository.UpdateUserDetail(userDetail);
        }


        /// <summary>
        /// Delete user details 
        /// <param name="id">id of delete user detail </param>
        /// </summary>
        /// <returns>Task</returns>
        [HttpDelete]
        [Route("DeleteUserDetails/{id}")]
        public bool DeleteUserDetail(int id)
        {
            return _userDetailRepository.DeleteUserDetail(id);
        }
    }
}


