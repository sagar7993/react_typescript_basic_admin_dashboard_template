import { updateObjectImmutably } from '../Contracts';
import { MyActions } from '../Actions';

const initialState = {
    isLoading: false,
    products: null,
    transactions: null,
    vendors: null
};

export const MyReducer = (state = initialState, action) => {
    switch (action.type) {
        case MyActions.SHOW_LOADER: {
            return updateObjectImmutably(state, {
                isLoading: true
            });
        }
        case MyActions.HIDE_LOADER: {
            return updateObjectImmutably(state, {
                isLoading: false
            });
        }
        case MyActions.GET_PRODUCTS_STARTED: {
            return updateObjectImmutably(state, {
                products: null
            });
        }
        case MyActions.GET_PRODUCTS_COMPLETED: {
            return updateObjectImmutably(state, {
                products: action.products
            });
        }
        case MyActions.GET_TRANSACTIONS_REJECTED: {
            return updateObjectImmutably(state, {
                products: null
            });
        }
        case MyActions.GET_TRANSACTIONS_STARTED: {
            return updateObjectImmutably(state, {
                transactions: null
            });
        }
        case MyActions.GET_TRANSACTIONS_COMPLETED: {
            return updateObjectImmutably(state, {
                transactions: action.transactions
            });
        }
        case MyActions.GET_TRANSACTIONS_REJECTED: {
            return updateObjectImmutably(state, {
                transactions: null
            });
        }
        case MyActions.GET_VENDORS_STARTED: {
            return updateObjectImmutably(state, {
                vendors: null
            });
        }
        case MyActions.GET_VENDORS_COMPLETED: {
            return updateObjectImmutably(state, {
                vendors: action.vendors
            });
        }
        case MyActions.GET_VENDORS_REJECTED: {
            return updateObjectImmutably(state, {
                vendors: null
            });
        }

        case MyActions.GET_SUBSCRIPTIONS_STARTED: {
            return updateObjectImmutably(state, {
                subscriptions: null
            });
        }
        case MyActions.GET_SUBSCRIPTIONS_COMPLETED: {
            return updateObjectImmutably(state, {
                subscriptions: action.subscriptions
            });
        }
        case MyActions.GET_SUBSCRIPTIONS_REJECTED: {
            return updateObjectImmutably(state, {
                subscriptions: null
            });
        }
        default: {
            return state;
        }
    }
};