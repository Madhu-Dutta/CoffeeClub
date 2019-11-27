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
    public class PastRecordsController : ApiController
    {
        private coffeedbEntities5 db = new coffeedbEntities5();

        // GET: api/PastRecords
        public IHttpActionResult GetPastRecords()
        {

            var result = (from r in db.Records
                          join m in db.MemberLogins on r.CreatedBy equals m.id
                          join n in db.MemberLogins on r.PaidBy equals n.id into x
                          from rn in x.DefaultIfEmpty()
                          where r.PaidBy != null
                          select new
                          {
                              RecordID = r.RecordID,
                              Date = r.Date,
                              Venue = r.Venue,
                              CreatedBy = m.FullName,
                              Payment = r.Payment,
                              Time = r.Time,
                              PaidBy = rn.FullName
                          }).ToList();

            return Ok(result);
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