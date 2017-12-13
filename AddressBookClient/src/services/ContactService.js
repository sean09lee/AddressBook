var saveContact = function(contact){
	var endpoint = 'http://dev.addressbookservice.com/api/contacts/';
	return fetch(endpoint, {
		method: 'POST',
		headers: {
		  'Accept': 'application/json',
		  'Content-Type': 'application/json',
		},
		body: JSON.stringify({
		  ContactFirstName: contact.ContactFirstName,
		  ContactMiddleName: contact.ContactMiddleName,
		  ContactLastName: contact.ContactLastName
		})
	});
}

export default saveContact;