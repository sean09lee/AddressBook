import { combineReducers } from 'redux';
import { REHYDRATE } from 'redux-persist';

const INITIAL_STATE = {
	currentUser: [],
	isLoggingIn: false,
};

export function itemsHasErrored(state = false, action) {
	switch (action.type) {
		case 'ITEMS_HAS_ERRORED':
				return action.hasErrored;
		default:
				return state;
	}
}

export function itemsIsLoading(state = false, action) {
	switch (action.type) {
			case 'ITEMS_IS_LOADING':
					return action.isLoading;
			default:
					return state;
	}
}

export function selectedContact(state = [], action) {
	switch (action.type) {
		case 'ITEMS_FETCH_DATA_SUCCESS':
				return action.contact;
		default:
				return state;
	}
}

export function allContacts(state = [], action){
	switch (action.type){
		case 'ITEMS_FETCH_CONTACTS_SUCCESS':
			return action.contacts
		default:
			return state;
	}
}

export function allFilteredContacts(state = [], action){
	switch (action.type){
		case 'ITEMS_FETCH_FILTERED_CONTACTS_SUCCESS':
			return action.contacts
		default:
			return state;
	}
}

export function selectedUser(state = INITIAL_STATE, action) {
	switch (action.type) {
		case REHYDRATE:
			return action.payload.selectedUser;
		case 'ITEMS_FETCH_USER_SUCCESS':
			return action.user;
		default:
			return [];
	}
}

export function isEditMode(state = false, action) {
	switch (action.type) {
		case 'IS_EDIT_MODE':
				return action.editMode;
		default:
				return state;
	}
}

export function searchTerm(state = '', action) {
	switch (action.type) {
		case 'IS_SEARCHTERM':
				return action.term;
		default:
				return state;
	}
}

export default combineReducers({
	selectedContact,
	itemsHasErrored,
	itemsIsLoading,
	allContacts,
	allFilteredContacts,
	selectedUser,
	isEditMode,
	searchTerm
});