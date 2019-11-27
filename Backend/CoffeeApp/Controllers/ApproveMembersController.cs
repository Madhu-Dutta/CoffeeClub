﻿using System;
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
    public class ApproveMembersController : ApiController
    {
        private coffeedbEntities5 db = new coffeedbEntities5();

        // GET: api/ApproveMembers
        public IQueryable<MemberLogin> GetMemberLogins()
        {
            var result = db.MemberLogins.Where(x => x.Approved == 0);
            //return db.MemberLogins;
            return result;
        }

        // GET: api/ApproveMembers/5
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

        // PUT: api/ApproveMembers/5
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

        // POST: api/ApproveMembers
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

        // DELETE: api/ApproveMembers/5
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