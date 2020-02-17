using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using BusinessEntity.UserDetail;
using BusinessLogic.LoginRepository;
using Microsoft.AspNetCore.Mvc;

namespace React_Material
{
    [Route("api/[controller]")]
    public class LoginController : Controller
    {
        public ILoginRepository _loginRepository;

        public LoginController(ILoginRepository loginRepository)
        {
            _loginRepository = loginRepository;
        }

        ///// <summary>
        ///// Update user details 
        ///// <param name="model">updated user detail </param>
        ///// </summary>
        ///// <returns>bool</returns>
        [HttpPut]
        [Route("ValidateUser")]
        public UserDetail ValidateUser(string email, string password)
        {
            return _loginRepository.ValidateUser(email, password);
        }

    }
}


