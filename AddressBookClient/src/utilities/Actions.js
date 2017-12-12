export function itemsHasErrored(bool) {
    return {
        type: 'ITEMS_HAS_ERRORED',
        hasErrored: bool
    };
}

export function itemsIsLoading(bool) {
    return {
        type: 'ITEMS_IS_LOADING',
        isLoading: bool
    };
}

export function itemsFetchDataSuccess(contact) {
    return {
        type: 'ITEMS_FETCH_DATA_SUCCESS',
        contact
    };
}

export function itemsFetchData(contact) {
    return (dispatch) => {
        dispatch(itemsIsLoading(true));
        dispatch(itemsFetchDataSuccess(contact));
    };
}