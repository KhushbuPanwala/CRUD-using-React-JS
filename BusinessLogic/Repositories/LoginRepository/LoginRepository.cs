using BusinessEntity.UserDetail;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace BusinessLogic.LoginRepository
{
    public class LoginRepository : ILoginRepository
    {
        string path = "";
        public LoginRepository()
        {
            path = Directory.GetCurrentDirectory() + @"\ClientApp\src" + @"\UserDetail.json";

        }

        private List<UserDetail> GetAllUserDetail()
        {
            List<UserDetail> userDetailList = new List<UserDetail>();
            using (StreamReader r = new StreamReader(path))
            {
                string json = r.ReadToEnd();
                userDetailList = JsonConvert.DeserializeObject<List<UserDetail>>(json);
            }
            return userDetailList.ToList();
        }

        private UserDetail GetUserDetailById(int id)
        {
            List<UserDetail> userDetails = GetAllUserDetail();
            UserDetail userDetail = userDetails.Where(a => a.Id == id).FirstOrDefault();
            return userDetail;
        }

        public UserDetail ValidateUser(string email, string password)
        {
            try
            {
                List<UserDetail> userDetailList = GetAllUserDetail();
                UserDetail userDetail = userDetailList.Where(a => a.Email == email && a.Password == password).FirstOrDefault();

                return userDetail;
                //if (userDetail != null)
                //{
                //    return true;
                //}
                //else
                //{
                //    return false;
                //}


            }
            catch (Exception e)
            {
                throw e;
            }
        }

    }
}
