import { combineReducers } from 'redux';

export default combineReducers({
	selectedContact,
	itemsHasErrored,
	itemsIsLoading,
	isEditMode
});

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

export function isEditMode(state = false, action) {
	switch (action.type) {
			case 'IS_EDIT_MODE':
					return action.editMode;
			default:
					return state;
	}
}