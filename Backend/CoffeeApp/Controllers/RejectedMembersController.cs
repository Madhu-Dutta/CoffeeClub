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
    public class RejectedMembersController : ApiController
    {
        private coffeedbEntities5 db = new coffeedbEntities5();

        // GET: api/RejectedMembers
        public IQueryable<MemberLogin> GetMemberLogins()
        {
            return db.MemberLogins;
        }

        // GET: api/RejectedMembers/5
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

        // PUT: api/RejectedMembers/5
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

            MemberLogin memberLogin1 = await db.MemberLogins.FindAsync(id);

            if (memberLogin.Approved != null && memberLogin1.Approved != memberLogin.Approved)
            {
                memberLogin1.Approved = memberLogin.Approved;
            }
            if (memberLogin.FullName != null && memberLogin1.FullName != memberLogin.FullName)
            {
                memberLogin1.FullName = memberLogin.FullName;
            }
            if (memberLogin.Email != null && memberLogin1.Email != memberLogin.Email)
            {
                memberLogin1.Email = memberLogin.Email;
            }
            if (memberLogin.Phone != null && memberLogin1.Phone != memberLogin.Phone)
            {
                memberLogin1.Phone = memberLogin.Phone;
            }
            if (memberLogin.Active != null && memberLogin1.Active != memberLogin.Active)
            {
                memberLogin1.Active = memberLogin.Active;
            }
            if (memberLogin.Password != null && memberLogin1.Password != memberLogin.Password)
            {
                memberLogin1.Password = memberLogin.Password;
            }
            db.Entry(memberLogin1).State = EntityState.Modified;

            //db.Entry(memberLogin).State = EntityState.Modified;

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

        // POST: api/RejectedMembers
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

        // DELETE: api/RejectedMembers/5
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