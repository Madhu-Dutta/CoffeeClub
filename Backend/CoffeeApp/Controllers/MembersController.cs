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
using System.Web.Http.Description;
using CoffeeApp.Models;

namespace CoffeeApp.Controllers
{
    public class MembersController : ApiController
    {
        private coffeedbEntities4 db = new coffeedbEntities4();

        // GET: api/Members
        public IQueryable<MemberLogin> GetMemberLogins()
        {
            return db.MemberLogins;
        }

        // GET: api/Members/5
        [ResponseType(typeof(MemberLogin))]
        public async Task<IHttpActionResult> GetMemberLogin(int id)
        {
            MemberLogin memberLogin = await db.MemberLogins.FindAsync(id);
            if (memberLogin == null)
            {
                return NotFound();
            }

            return Ok(memberLogin);
        }

        // PUT: api/Members/5
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutMemberLogin(int id, MemberLogin memberLogin)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != memberLogin.id)
            {
                return BadRequest();
            }

            db.Entry(memberLogin).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MemberLoginExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/Members
        [ResponseType(typeof(MemberLogin))]
        public async Task<IHttpActionResult> PostMemberLogin(MemberLogin memberLogin)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.MemberLogins.Add(memberLogin);
            await db.SaveChangesAsync();

            return CreatedAtRoute("DefaultApi", new { id = memberLogin.id }, memberLogin);
        }

        // DELETE: api/Members/5
        [ResponseType(typeof(MemberLogin))]
        public async Task<IHttpActionResult> DeleteMemberLogin(int id)
        {
            MemberLogin memberLogin = await db.MemberLogins.FindAsync(id);
            if (memberLogin == null)
            {
                return NotFound();
            }

            db.MemberLogins.Remove(memberLogin);
            await db.SaveChangesAsync();

            return Ok(memberLogin);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool MemberLoginExists(int id)
        {
            return db.MemberLogins.Count(e => e.id == id) > 0;
        }
    }
}