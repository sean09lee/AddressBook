using AddressBookService.Models;
using System;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Web.Http.Description;

namespace AddressBookService.Controllers
{
    [EnableCors(origins: "http://localhost:3000", headers: "*", methods: "*")]
    public class UserController : ApiController
    {
        private AddressBookEntities db = new AddressBookEntities();

        // GET api/user
        public async Task<IHttpActionResult> Get()
        {
            var users = await db.Users.ToListAsync();
            if (users == null)
            {
                return NotFound();
            }
            // order by lastname, firstname, company
            var contacts = users.OrderBy(x => x.UsersLastName).ThenBy(x => x.UsersFirstName);
            return Ok(contacts);
        }

        // GET api/user?id=5
        [ResponseType(typeof(User))]
        public async Task<IHttpActionResult> Get(int id)
        {
            User user = await db.Users.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            return Ok(user);
        }

        // GET api/user?user={}
        [ResponseType(typeof(User))]
        public async Task<IHttpActionResult> Get(string email, string password)
        {
            var selectedUser = await db.Users.Where(x => x.UsersEmail == email && x.UsersPassword == password).FirstOrDefaultAsync();
            if (selectedUser == null)
            {
                return NotFound();
            }

            return Ok(selectedUser);
        }

        // POST api/user
        [ResponseType(typeof(Contact))]
        public async Task<IHttpActionResult> Post(User user)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                // check if existing user by email
                var existingUser = await db.Users.Where(x => x.UsersEmail == user.UsersEmail).FirstOrDefaultAsync();
                if (existingUser != null)
                {
                    return BadRequest();
                }

                // save to db
                user.UsersModified = DateTime.Now;
                db.Users.Add(user);
                await db.SaveChangesAsync();

                return CreatedAtRoute("DefaultApi", new { id = user.UsersId}, user);
            }
            catch(Exception ex)
            {
                Console.WriteLine(ex);
                throw;
            }
        }

        // PUT api/user/5
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> Put(int id, User user)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != user.UsersId)
            {
                return BadRequest();
            }

            db.Entry(user).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!await UserExistsAsync(id))
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

        // DELETE api/user/5
        [ResponseType(typeof(Contact))]
        public async Task<IHttpActionResult> Delete(int id)
        {
            User selectedUser = await db.Users.FindAsync(id);
            if (selectedUser == null)
            {
                return NotFound();
            }

            try
            {
                // remove referencing data from dbo.UserContacts
                var userContacts = db.UserContacts.Where(x => x.UsersId == id);
                foreach (var userContact in userContacts)
                {
                    db.UserContacts.Remove(userContact);
                }

                // remove from dbo.Users
                db.Users.Remove(selectedUser);
                await db.SaveChangesAsync();

                // return on success
                return Ok(selectedUser);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                throw;
            }
        }

        /// <summary>
        /// Check to see if contact exists based on id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        private async Task<bool> UserExistsAsync(int id)
        {
            return await db.Users.CountAsync(e => e.UsersId == id) > 0;
        }
    }
}
