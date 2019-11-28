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
        coffeedbEntities5 DB = new coffeedbEntities5();      

        //[Route("Login")]

        [HttpPost]

        public Response memberLogin(Login login)

        {
            
            var result = DB.MemberLogins.Where(x => x.Email.Equals(login.Email) && x.Password.Equals(login.Password)).FirstOrDefault();

            if (result != null)

            {
                //1=approved 2=rejected 0=unapproved
                if (result.Approved == 1)
                {
                    return new Response { Status = "Success", Message = "Login Successful  " +result.id };
                }
                return new Response { Status = "Success Unapproved User", Message = "Login Successful  " };


            }

            else

                return new Response { Status = "Invalid", Message = "Invalid User." };

        }


    }
}
