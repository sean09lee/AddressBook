export function saveUser(contact){
	var endpoint = 'http://dev.addressbookservice.com/api/users/';
	fetch(endpoint, {
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
	}).then();
}

export function getUser(contact){
	var endpoint = 'http://dev.addressbookservice.com/api/contacts/';
	fetch(endpoint, {
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
	}).then();
}