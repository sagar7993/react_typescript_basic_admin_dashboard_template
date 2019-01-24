import axios, { AxiosResponse } from 'axios';

import { Product, Transaction, Vendor, Subscription } from '../Contracts';

import { getDataOptions } from './BackendService';

const getProductsUrl = '/products';
const getTransactionsUrl = '/transactions';
const getVendorsUrl = '/vendors';
const getSubscriptionsUrl = '/subscriptions';

export const getProducts = async (): Promise<Product[]> => {
	try {
		const response: AxiosResponse<Product[]> = await axios(getDataOptions(getProductsUrl));
		return response.data;
	} catch (error) {
		return Promise.reject(error);
	}
};

export const getTransactions = async (): Promise<Transaction[]> => {
	try {
		const response: AxiosResponse<Transaction[]> = await axios(getDataOptions(getTransactionsUrl));
		return response.data;
	} catch (error) {
		return Promise.reject(error);
	}
};

export const getVendors = async (): Promise<Vendor[]> => {
	try {
		const response: AxiosResponse<Vendor[]> = await axios(getDataOptions(getVendorsUrl));
		return response.data;
	} catch (error) {
		return Promise.reject(error);
	}
};

export const getSubscriptions = async (): Promise<Subscription[]> => {
	try {
		const response: AxiosResponse<Subscription[]> = await axios(getDataOptions(getSubscriptionsUrl));
		return response.data;
	} catch (error) {
		return Promise.reject(error);
	}
};