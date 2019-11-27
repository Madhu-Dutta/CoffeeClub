using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Web.Http.Description;
using CoffeeApp.Models;

namespace CoffeeApp.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class PaymentController : ApiController
    {
        private coffeedbEntities5 db = new coffeedbEntities5();

        // GET: api/Payment
        //Sum of Payments
        //public IQueryable<Record> GetPayment()
        public IHttpActionResult GetPayment()
        {


            var result = (from r in db.Records
                          join n in db.MemberLogins on r.PaidBy equals n.id
                          group r by n.FullName into x
                          select new
                          {
                              PaidBy = x.Key,
                              Payment = x.Sum(pc => pc.Payment)

                          }).ToList();

            return Ok(result);
            //return result;
            //return Request.CreateResponse(HttpStatusCode.OK, result);
        }
                              

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool RecordExists(int id)
        {
            return db.Records.Count(e => e.RecordID == id) > 0;
        }
    }
}