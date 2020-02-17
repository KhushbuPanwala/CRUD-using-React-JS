using BusinessEntity.UserDetail;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace BusinessLogic.UserRepository
{
    public class UserRepository : IUserRepository
    {
        string path = "";
        public UserRepository()
        {
            path = Directory.GetCurrentDirectory() + @"\ClientApp\src" + @"\UserDetail.json";

        }

        public List<UserDetail> GetAllUserDetail()
        {
            List<UserDetail> userDetailList = new List<UserDetail>();
            using (StreamReader r = new StreamReader(path))
            {
                string json = r.ReadToEnd();
                userDetailList = JsonConvert.DeserializeObject<List<UserDetail>>(json);
            }
            return userDetailList.ToList();
        }

        public UserDetail GetUserDetailById(int id)
        {
            List<UserDetail> userDetails = GetAllUserDetail();
            UserDetail userDetail = userDetails.Where(a => a.Id == id).FirstOrDefault();
            return userDetail;
        }

        public bool AddUserDetail(UserDetail userDetail)
        {
            try
            {
                List<UserDetail> userDetailList = GetAllUserDetail();
                int id = 1;
                if (userDetailList.Count > 0)
                {
                    id = userDetailList.Last().Id;
                    id++;
                }

                userDetail.Id = id;
                userDetailList.Add(userDetail);
                string userData = JsonConvert.SerializeObject(userDetailList);

                System.IO.File.WriteAllText(path, userData);
                return true;
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public bool UpdateUserDetail(UserDetail userDetail)
        {
            try
            {
                List<UserDetail> userDetailList = GetAllUserDetail();
                userDetailList[userDetailList.FindIndex(ind => ind.Id == userDetail.Id)] = userDetail;

                string userData = JsonConvert.SerializeObject(userDetailList);
                System.IO.File.WriteAllText(path, userData);
                return true;
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public bool DeleteUserDetail(int id)
        {
            try
            {
                List<UserDetail> userDetailList = GetAllUserDetail();
                UserDetail user = userDetailList.Where(a => a.Id == id).FirstOrDefault();
                bool isDeleted = userDetailList.Remove(user);
                string userData = JsonConvert.SerializeObject(userDetailList);
                System.IO.File.WriteAllText(path, userData);
                return isDeleted;
            }
            catch (Exception e)
            {
                throw e;
            }

        }
    }
}
