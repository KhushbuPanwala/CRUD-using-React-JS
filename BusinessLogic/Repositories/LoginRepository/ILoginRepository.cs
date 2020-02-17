using BusinessEntity.UserDetail;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BusinessLogic.LoginRepository
{
    public interface ILoginRepository
    {
        /// <summary>
        /// Validate login user is valid or not
        /// </summary>
        /// <param name="email">Email Id of loggin user</param>
        /// <param name="password">Password of loggin user</param>
        /// <returns>Logged in UserDetail </returns>
        UserDetail ValidateUser(string email, string password);


    }
}
