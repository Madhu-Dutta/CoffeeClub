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
    public class RecordsController : ApiController
    {
        private coffeedbEntities5 db = new coffeedbEntities5();

        // GET: api/Records
        //public IQueryable<Record> GetRecords()
        //{
        //    return db.Records;
        //}
        
        //public IQueryable<Record> GetRecords()
        public IHttpActionResult GetRecords()
        {
            
            var result = (from r in db.Records
                          join m in db.MemberLogins on r.CreatedBy equals m.id
                          where r.PaidBy == null
                          
                          select new
                          {
                              RecordID=r.RecordID,
                              Date=r.Date,
                              Venue=r.Venue,
                              CreatedBy=m.FullName,
                              Payment="-",
                             Time=r.Time,
                              PaidBy="-"
                          }).ToList();

            return Ok(result);
            //return result;
            //return Request.CreateResponse(HttpStatusCode.OK, result);
        }

        
        // GET: api/Records/5
        [ResponseType(typeof(Record))]
        public async Task<IHttpActionResult> GetRecord(int id)
        {
            Record record = await db.Records.FindAsync(id);
            if (record == null)
            {
                return NotFound();
            }

            return Ok(record);
        }

        // PUT: api/Records/5
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutRecord(int id, Record record)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != record.RecordID)
            {
                return BadRequest();
            }

            db.Entry(record).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!RecordExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.OK);
        }

        // POST: api/Records
        [ResponseType(typeof(Record))]
        public async Task<IHttpActionResult> PostRecord(Record record)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Records.Add(record);
            await db.SaveChangesAsync();

            return CreatedAtRoute("DefaultApi", new { id = record.RecordID }, record);
        }

        // DELETE: api/Records/5
        [ResponseType(typeof(Record))]
        public async Task<IHttpActionResult> DeleteRecord(int id)
        {
            Record record = await db.Records.FindAsync(id);
            if (record == null)
            {
                return NotFound();
            }

            db.Records.Remove(record);
            await db.SaveChangesAsync();

            return Ok(record);
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