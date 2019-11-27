using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Data.Entity.Validation;
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
    public class MembersController : ApiController
    {
        private coffeedbEntities5 db = new coffeedbEntities5();

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
            MemberLogin memberLogin2 = await db.MemberLogins.FindAsync(id);
            if (memberLogin.Approved != null && memberLogin2.Approved != memberLogin.Approved)
            {
                memberLogin2.Approved = memberLogin.Approved;
            }
            if (memberLogin.FullName != null && memberLogin2.FullName != memberLogin.FullName)
            {
                memberLogin2.FullName = memberLogin.FullName;
            }
            if (memberLogin.Email != null && memberLogin2.Email != memberLogin.Email)
            {
                memberLogin2.Email = memberLogin.Email;
            }
            if (memberLogin.Phone != null && memberLogin2.Phone != memberLogin.Phone)
            {
                memberLogin2.Phone = memberLogin.Phone;
            }
            if (memberLogin.Active !=null && memberLogin2.Active != memberLogin.Active)
            {
                memberLogin2.Active = memberLogin.Active;
            }
            if (memberLogin.Password != null && memberLogin2.Password != memberLogin.Password)
            {
                memberLogin2.Password = memberLogin.Password;
             }
            db.Entry(memberLogin2).State = EntityState.Modified;

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
                    //return Ok(memberLogin);
                    throw;
                }
            }
            catch (DbEntityValidationException ex)
            {
                // Retrieve the error messages as a list of strings.
                var errorMessages = ex.EntityValidationErrors
                        .SelectMany(x => x.ValidationErrors)
                        .Select(x => x.ErrorMessage);

                // Join the list to a single string.
                var fullErrorMessage = string.Join("; ", errorMessages);

                // Combine the original exception message with the new one.
                var exceptionMessage = string.Concat(ex.Message, " The validation errors are: ", fullErrorMessage);

                return BadRequest(exceptionMessage.ToString());
            }
            catch (Exception e)
            {
                return BadRequest(e.ToString());
            }

            return StatusCode(HttpStatusCode.OK);
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