import { Product, Transaction, Vendor, Subscription } from '../Contracts';

export const MyActions = {
    SHOW_LOADER: 'SHOW_LOADER',
    HIDE_LOADER: 'HIDE_LOADER',
    GET_PRODUCTS_STARTED: 'GET_PRODUCTS_STARTED',
    GET_PRODUCTS_COMPLETED: 'GET_PRODUCTS_COMPLETED',
    GET_PRODUCTS_REJECTED: 'GET_PRODUCTS_REJECTED',
    GET_TRANSACTIONS_STARTED: 'GET_TRANSACTIONS_STARTED',
    GET_TRANSACTIONS_COMPLETED: 'GET_TRANSACTIONS_COMPLETED',
    GET_TRANSACTIONS_REJECTED: 'GET_TRANSACTIONS_REJECTED',
    GET_VENDORS_STARTED: 'GET_VENDORS_STARTED',
    GET_VENDORS_COMPLETED: 'GET_VENDORS_COMPLETED',
    GET_VENDORS_REJECTED: 'GET_VENDORS_REJECTED',
    GET_SUBSCRIPTIONS_STARTED: 'GET_SUBSCRIPTIONS_STARTED',
    GET_SUBSCRIPTIONS_COMPLETED: 'GET_SUBSCRIPTIONS_COMPLETED',
    GET_SUBSCRIPTIONS_REJECTED: 'GET_SUBSCRIPTIONS_REJECTED'
};

export const MyActionCreators = {
    showLoader: () => {
        return (dispatch) => {
            dispatch({
                type: MyActions.SHOW_LOADER
            });
        };
    },
    hideLoader: () => {
        return (dispatch) => {
            dispatch({
                type: MyActions.HIDE_LOADER
            });
        };
    },
    getProductsStarted: () => {
        return (dispatch) => {
            dispatch({
                type: MyActions.GET_PRODUCTS_STARTED
            });
        };
    },
    getProductsCompleted: (products: Product[]) => {
        return (dispatch) => {
            dispatch({
                type: MyActions.GET_PRODUCTS_COMPLETED,
                products
            });
        };
    },
    getProductsRejected: () => {
        return (dispatch) => {
            dispatch({
                type: MyActions.GET_PRODUCTS_REJECTED
            });
        };
    },
    getTransactionsStarted: () => {
        return (dispatch) => {
            dispatch({
                type: MyActions.GET_TRANSACTIONS_STARTED
            });
        };
    },
    getTransactionsCompleted: (transactions: Transaction[]) => {
        return (dispatch) => {
            dispatch({
                type: MyActions.GET_TRANSACTIONS_COMPLETED,
                transactions
            });
        };
    },
    getTransactionsRejected: () => {
        return (dispatch) => {
            dispatch({
                type: MyActions.GET_TRANSACTIONS_REJECTED
            });
        };
    },
    getVendorsStarted: () => {
        return (dispatch) => {
            dispatch({
                type: MyActions.GET_VENDORS_STARTED
            });
        };
    },
    getVendorsCompleted: (vendors: Vendor[]) => {
        return (dispatch) => {
            dispatch({
                type: MyActions.GET_VENDORS_COMPLETED,
                vendors
            });
        };
    },
    getVendorsRejected: () => {
        return (dispatch) => {
            dispatch({
                type: MyActions.GET_VENDORS_REJECTED
            });
        };
    },
    getSubscriptionsStarted: () => {
        return (dispatch) => {
            dispatch({
                type: MyActions.GET_SUBSCRIPTIONS_STARTED
            });
        };
    },
    getSubscriptionsCompleted: (subscriptions: Subscription[]) => {
        return (dispatch) => {
            dispatch({
                type: MyActions.GET_SUBSCRIPTIONS_COMPLETED,
                subscriptions
            });
        };
    },
    getSubscriptionsRejected: () => {
        return (dispatch) => {
            dispatch({
                type: MyActions.GET_SUBSCRIPTIONS_REJECTED
            });
        };
    }
};