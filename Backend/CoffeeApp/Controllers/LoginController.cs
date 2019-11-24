using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using CoffeeApp.Models;
using CoffeeApp.VM;

namespace CoffeeApp.Controllers
{
    [RoutePrefix("Api/login")]
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class LoginController : ApiController
    {
        coffeedbEntities1 DB = new coffeedbEntities1();

        [Route("InsertMember")]

        [HttpPost]

        public object InsertMember(Register Reg)

        {

            try

            {

                MemberLogin ML = new MemberLogin();


                if (ML.Id == 0)

                {
                    //if (Reg.Fullname == "" || Reg.Fullname == null)
                    //{
                    //    return new Response

                    //    { Status = "Error", Message = "Invalid Data." };
                        
                    //}
                    
                    ML.FullName = Reg.Fullname;

                    ML.Phone = Reg.Phone;

                    ML.Email = Reg.Email;

                    ML.Password = Reg.Password;

                    DB.MemberLogins.Add(ML);

                    DB.SaveChanges();

                    return new Response

                    { Status = "Success", Message = "Record SuccessFully Savedddddd." };

                }

            }

            catch (Exception)

            {
                return new Response

                { Status = "Error", Message = "Exception : Invalid Data." };
                //throw;

            }

            return new Response

            { Status = "Error", Message = "Invalid Data." };

        }


        [Route("Login")]

        [HttpPost]

        public Response memberLogin(Login login)

        {

            var log = DB.MemberLogins.Where(x => x.Email.Equals(login.Email) && x.Password.Equals(login.Password)).FirstOrDefault();

            if (log == null)

            {

                return new Response { Status = "Invalid", Message = "Invalid User." };

            }

            else

                return new Response { Status = "Success", Message = "Login Successful" };

        }


    }
}
