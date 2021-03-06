export function itemsHasErrored(bool) {
	return {
		type: 'ITEMS_HAS_ERRORED',
		hasErrored: bool
	};
}

export function itemsFetchDataSuccess(contact) {
	return {
		type: 'ITEMS_FETCH_DATA_SUCCESS',
		contact
	};
}

export function itemsFetchContactsSuccess(contacts){
	return {
		type: 'ITEMS_FETCH_CONTACTS_SUCCESS',
		contacts
	}
}

export function itemsFetchFilteredContactsSuccess(contacts){
	return {
		type: 'ITEMS_FETCH_FILTERED_CONTACTS_SUCCESS',
		contacts
	}
}

export function itemsFetchUserSuccess(user){
	return {
		type: 'ITEMS_FETCH_USER_SUCCESS',
		user
	}
}

export function searchTermType(term){
	return {
		type: 'IS_SEARCHTERM',
		term
	}
}

export function editMode(bool){
	return {
		type: 'IS_EDIT_MODE',
		editMode: bool
	}
}

export function itemsIsLoading(bool) {
	return {
		type: 'ITEMS_IS_LOADING',
		isLoading: bool
	};
}

// set data related to a single contact
export function setContact(contact) {
	return (dispatch) => {
		dispatch(itemsIsLoading(true));
		dispatch(itemsFetchDataSuccess(contact));
	};
}

// set data related to all contacts
export function setContacts(contacts) {
	return (dispatch) => {
		dispatch(itemsIsLoading(true));
		dispatch(itemsFetchContactsSuccess(contacts));
	};
}

// set data related to all contacts filtered by search term
export function setFilteredContacts(contacts) {
	return (dispatch) => {
		dispatch(itemsIsLoading(true));
		dispatch(itemsFetchFilteredContactsSuccess(contacts));
	};
}

// set data related to a current user
export function setUser(user) {
	return (dispatch) => {
		dispatch(itemsIsLoading(true));
		dispatch(itemsFetchUserSuccess(user));
	};
}

// set edit mode for contact card
export function setEditMode(bool){
	return (dispatch) => {
		dispatch(editMode(bool));
	};
}

// set the search term from the search bar
export function setSearchTerm(term){
	return (dispatch) => {
		dispatch(searchTermType(term));
	};
}