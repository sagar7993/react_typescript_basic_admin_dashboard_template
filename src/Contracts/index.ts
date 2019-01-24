export class Product {
    id: string;
    createdAt: string;
    category: string;
    name: string;
    price: string;
    saleCount: number;
}

export class Transaction {
    id: string;
    createdAt: string;
    product: string;
    value: string;
    quantity: string;
    vendor: string;
    channelPartner: string;
}

export class Vendor {
    id: string;
    createdAt: string;
    name: string;
    channelPartnerCount: number;
    paymentStatus: boolean;
    invoiceAmount: number;
}

export class Subscription {
    id: string;
    createdAt: string;
    product: string;
    productName: string;
    quantity: string | number;
    vendor: string;
    amountPerUnit: string | number;
    totalAmount: number;
}

export const updateObjectImmutably = (oldObject, newValuesObject) => {
    return {
        ...oldObject,
        ...newValuesObject
    };
};

export const SetInnerHtml = (htmlString: string) => {
    return {
        __html: htmlString
    };
};

export interface MyWindow extends Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any;
    M: any;
    Chart: any;
}

interface SessionStorage extends Storage {
    get: (key: string, parseJson: boolean) => any;
    save: (key: string, data: any) => void;
    deleteItem: (key: string) => void;
    deleteAll: () => void;
}

class SessionStorage implements SessionStorage {
    get = (key: string, parseJson: boolean): any => {
        let data: any = sessionStorage.getItem(key) || null;
        if (data && parseJson) {
            data = JSON.parse(data);
        }
        return data;
    }
    save = (key: string, data: any) => {
        sessionStorage.setItem(key, JSON.stringify(data));
    }
    deleteItem = (key: string) => {
        sessionStorage.removeItem(key);
    }
    deleteAll = () => {
        sessionStorage.clear();
    }
}

export const MySessionStorage: SessionStorage = new SessionStorage();

interface LocalStorage extends Storage {
    get: (key: string, parseJson: boolean) => any;
    save: (key: string, data: any) => void;
    deleteItem: (key: string) => void;
    deleteAll: () => void;
}

class LocalStorage implements LocalStorage {
    get = (key: string, parseJson: boolean): any => {
        let data: any = localStorage.getItem(key) || null;
        if (data && parseJson) {
            data = JSON.parse(data);
        }
        return data;
    }
    save = (key: string, data: any) => {
        localStorage.setItem(key, JSON.stringify(data));
    }
    deleteItem = (key: string) => {
        localStorage.removeItem(key);
    }
    deleteAll = () => {
        localStorage.clear();
    }

}

export const MyLocalStorage: LocalStorage = new LocalStorage();

export class MyHttpHeadersOptions {
    method: string;
    baseURL: string | undefined;
    url: string;
    headers?: any;
    data?: any;
    constructor(method: string, baseUrl: string | undefined, url: string) {
        this.method = method;
        this.baseURL = baseUrl;
        this.url = url;
    }
}