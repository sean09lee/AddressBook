const userEndpoint = 'http://dev.addressbookservice.com/api/user';

export function saveUser(user){
	return fetch(userEndpoint, {
		method: 'POST',
		headers: {
		  'Accept': 'application/json',
		  'Content-Type': 'application/json',
		},
		body: JSON.stringify(user)
	});
}

export function getUser(user){
	var endpoint = userEndpoint + '?email=' + user.UsersEmail + '&password=' + user.UsersPassword;
	return fetch(endpoint);
}