const userEndpoint = 'http://dev.addressbookservice.com/api/users';

export function saveUser(contact){
	fetch(userEndpoint, {
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
	fetch(userEndpoint, {
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