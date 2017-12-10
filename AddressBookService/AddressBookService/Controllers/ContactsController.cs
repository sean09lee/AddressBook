using AddressBookService.Models;
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
    public class ContactsController : ApiController
    {
        private AddressBookEntities db = new AddressBookEntities();

        // GET api/contacts
        public async Task<IHttpActionResult> Get()
        {
            var contactList = await db.Contacts.ToListAsync();
            if (contactList == null)
            {
                return NotFound();
            }
            // order by lastname, firstname, company
            var contacts = contactList.OrderBy(x => x.ContactLastName).ThenBy(x => x.ContactFirstName);
            return Ok(contacts);
        }

        // GET api/contacts/5
        [ResponseType(typeof(Contact))]
        public async Task<IHttpActionResult> Get(int id)
        {
            Contact contact = await db.Contacts.FindAsync(id);
            if (contact == null)
            {
                return NotFound();
            }

            return Ok(contact);
        }

        // POST api/contacts
        [ResponseType(typeof(Contact))]
        public async Task<IHttpActionResult> Post(Contact contact)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Contacts.Add(contact);
            await db.SaveChangesAsync();

            return CreatedAtRoute("DefaultApi", new { id = contact.ContactId }, contact);
        }

        // PUT api/contacts/5
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> Put(int id, Contact contact)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != contact.ContactId)
            {
                return BadRequest();
            }

            db.Entry(contact).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!await ContactExistsAsync(id))
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

        // DELETE api/contacts/5
        [ResponseType(typeof(Contact))]
        public async Task<IHttpActionResult> Delete(int id)
        {
            Contact contact = await db.Contacts.FindAsync(id);
            if (contact == null)
            {
                return NotFound();
            }

            db.Contacts.Remove(contact);
            await db.SaveChangesAsync();

            return Ok(contact);
        }

        /// <summary>
        /// Check to see if contact exists based on id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        private async Task<bool> ContactExistsAsync(int id)
        {
            var exists = await db.Contacts.CountAsync(e => e.ContactId == id) > 0;
            if (exists)
            {
                return true;
            }
            return false;
        }
    }
}
