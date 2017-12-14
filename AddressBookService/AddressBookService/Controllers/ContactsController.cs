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

            // order by lastname, firstname
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

            try
            {
                foreach(var address in contact.Addresses)
                {
                    // Update dbo.Address
                    address.AddressModified = DateTime.Now;
                    var existingAddress = await db.Addresses.Where(x => x.AddressId == address.AddressId).FirstOrDefaultAsync();
                    if (existingAddress == null)
                    {
                        // add new if does not exist
                        db.Addresses.Add(address);
                    }
                    else
                    {
                        // update if exists
                        existingAddress = address;
                        var local = db.Set<Address>().Local.FirstOrDefault(f => f.AddressId == existingAddress.AddressId);
                        if (local != null)
                        {
                            db.Entry(local).State = EntityState.Detached;
                        }
                        db.Entry(existingAddress).State = EntityState.Modified;
                    }

                    // Update dbo.AddressType
                    address.AddressType.AddressTypeModified = DateTime.Now;
                    var existingAddressType = await db.AddressTypes.Where(x => x.AddressTypeId == address.AddressTypeId).FirstOrDefaultAsync();
                    if (existingAddressType == null)
                    {
                        // add new if does not exist
                        db.AddressTypes.Add(address.AddressType);
                    }
                    else
                    {
                        // update if exists
                        existingAddressType = address.AddressType;
                        var local = db.Set<AddressType>().Local.FirstOrDefault(f => f.AddressTypeId == existingAddressType.AddressTypeId);
                        if (local != null)
                        {
                            db.Entry(local).State = EntityState.Detached;
                        }
                        db.Entry(existingAddressType).State = EntityState.Modified;
                    }
                }
                
                foreach(var email in contact.Emails)
                {
                    // Update dbo.Email
                    email.EmailModified = DateTime.Now;
                    var existingEmail = await db.Emails.Where(x => x.EmailId == email.EmailId).FirstOrDefaultAsync();
                    if (existingEmail == null)
                    {
                        // add new if does not exist
                        db.Emails.Add(email);
                    }
                    else
                    {
                        // update if exists
                        existingEmail = email;
                        var local = db.Set<Email>().Local.FirstOrDefault(f => f.EmailId == existingEmail.EmailId);
                        if (local != null)
                        {
                            db.Entry(local).State = EntityState.Detached;
                        }
                        db.Entry(existingEmail).State = EntityState.Modified;
                    }

                    // Update dbo.EmailType
                    email.EmailType.EmailTypeModified = DateTime.Now;
                    var existingEmailType = await db.EmailTypes.Where(x => x.EmailTypeId == email.EmailTypeId).FirstOrDefaultAsync();
                    if (existingEmailType == null)
                    {
                        // add new if does not exist
                        db.EmailTypes.Add(email.EmailType);
                    }
                    else
                    {
                        // update if exists
                        existingEmailType = email.EmailType;
                        var local = db.Set<EmailType>().Local.FirstOrDefault(f => f.EmailTypeId == existingEmailType.EmailTypeId);
                        if (local != null)
                        {
                            db.Entry(local).State = EntityState.Detached;
                        }
                        db.Entry(existingEmailType).State = EntityState.Modified;
                    }
                }

                foreach(var userContact in contact.UserContacts)
                {
                    // Update dbo.UserContact
                    userContact.UserContactModified = DateTime.Now;
                    var existingUserContact = await db.UserContacts.Where(x => x.UserContactId == userContact.UserContactId).FirstOrDefaultAsync();
                    if (existingUserContact == null)
                    {
                        // add new if does not exist
                        db.UserContacts.Add(userContact);
                    }
                    else
                    {
                        // update if exists
                        existingUserContact = userContact;
                        var local = db.Set<UserContact>().Local.FirstOrDefault(f => f.UserContactId == existingUserContact.UserContactId);
                        if (local != null)
                        {
                            db.Entry(local).State = EntityState.Detached;
                        }
                        db.Entry(existingUserContact).State = EntityState.Modified;
                    }
                    
                }

                // Update dbo.Contact
                contact.ContactModified = DateTime.Now;
                var existingContact = await db.Contacts.Where(x => x.ContactId == contact.ContactId).FirstOrDefaultAsync();
                if (existingContact == null)
                {
                    db.Contacts.Add(contact);
                }
                else
                {
                    existingContact = contact;
                    var local = db.Set<Contact>().Local.FirstOrDefault(f => f.ContactId == existingContact.ContactId);
                    if (local != null)
                    {
                        db.Entry(local).State = EntityState.Detached;
                    }
                    db.Entry(existingContact).State = EntityState.Modified;
                }

                await db.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
            }
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

            try {
                // remove from referencing dbo.UserContact table
                var userContacts = db.UserContacts.Where(x => x.ContactId == id).AsEnumerable();
                foreach (var userContact in userContacts)
                {
                    db.UserContacts.Remove(userContact);
                }
                
                // remove from referencing dbo.Email table
                var emails = db.Emails.Where(x => x.ContactId == id).AsEnumerable();
                foreach (var email in emails)
                {
                    db.Emails.Remove(email);
                }

                // remove from dbo.Contact table
                db.Contacts.Remove(contact);
                await db.SaveChangesAsync();

                // return on success
                return Ok(contact);
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
        private async Task<bool> ContactExistsAsync(int id)
        {
            return await db.Contacts.CountAsync(e => e.ContactId == id) > 0;
        }
    }
}
