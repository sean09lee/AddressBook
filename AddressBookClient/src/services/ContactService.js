const contactEndpoint = 'http://dev.addressbookservice.com/api/contacts/';

// get all contacts
export function getContacts(){
	return fetch(contactEndpoint);
}

// delete a contact by id
export function deleteContact(contactId){
	var endpoint = contactEndpoint + contactId;
	return fetch(endpoint, {
		method: 'DELETE',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
		}
	});
}

// save a contact
export function saveContact(contact){
	return fetch(contactEndpoint, {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(contact)
	});
}