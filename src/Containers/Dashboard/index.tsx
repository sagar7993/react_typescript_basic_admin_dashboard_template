import * as React from 'react';
import { connect } from 'react-redux';

import WrappingComponent from '../../Components/HigherOrderComponents/WrappingComponent';
import HttpStatusGuard from '../../Services/RouteGuards/HttpStatusGuard';

import MyLoader from '../../Components/UI/Loader';

import { MyActionCreators } from '../../Actions';

import { getProducts, getTransactions } from '../../Services/MyService';

import { Product, Transaction, MyWindow } from '../../Contracts';

declare var window: MyWindow;

export interface Props {
    isLoading: boolean;
    products: Product[];
    transactions: Transaction[];
    showLoader: any;
    hideLoader: any;
    getProductsStarted: any;
    getProductsCompleted: any;
    getProductsRejected: any;
    getTransactionsStarted: any;
    getTransactionsCompleted: any;
    getTransactionsRejected: any;
}

export interface State { }

export class MyDashboard extends React.Component<Props, State> {

    state: State = {};

    render() {
        return (
            <WrappingComponent>
                {(!this.props.isLoading && this.props.products && this.props.products.length > 0 && this.props.transactions && this.props.transactions.length > 0) &&
                    <WrappingComponent>
                        <div className="row">
                            <h3 className="center">My Dashboard</h3>
                        </div>
                        <div className="row">
                            <div className="col s12 no-padding">
                            <ul className="tabs">
                                <li className="tab col s4"><a href="#test1">Top Selling Products</a></li>
                                <li className="tab col s4"><a href="#test2">Transactions per Product</a></li>
                                <li className="tab col s4"><a href="#test3">Transactions per Vendor</a></li>
                            </ul>
                            </div>
                            <div id="test1" className="col s12">
                                <div className="row"></div>
                                <canvas id="myProductsBarChart"></canvas>
                            </div>
                            <div id="test2" className="col s12">
                                <div className="row"></div>
                                <canvas id="myTransactionsPerProductBarChart"></canvas>
                            </div>
                            <div id="test3" className="col s12">
                                <div className="row"></div>
                                <canvas id="myTransactionsPerVendorBarChart"></canvas>
                            </div>
                        </div>
                    </WrappingComponent>
                }
                {(this.props.isLoading || !this.props.products || this.props.products.length === 0 || !this.props.transactions || this.props.transactions.length === 0) &&
                    <MyLoader />
                }
            </WrappingComponent>
        );
    }

    componentDidMount() {
        this.props.showLoader();
        this.props.getProductsStarted();
        this.props.getTransactionsStarted();
        const products = getProducts();
        const transactions = getTransactions();
        Promise.all([products, transactions]).then(results => {
            setTimeout(() => {
                const elems = document.querySelectorAll('.tabs');
                window.M.Tabs.init(elems, {});
            }, 0);
            this.props.hideLoader();
            this.props.getProductsCompleted(results[0]);
            this.props.getTransactionsCompleted(results[1]);
            this.constructProductsBarChart();
            this.constructTransactionsPerProductBarChart();
            this.constructTransactionsPerVendorBarChart();
        }).catch(error => {
            this.props.hideLoader();
            this.props.getProductsRejected();
            this.props.getTransactionsRejected();
        });
    }

    getRandomHexColors = (count: number): string[] => {
        const result = new Array();
        for (let i = 0; i < count; i++) {
            const color = '#000000'.replace(/0/g, () => (~~(Math.random() * 16)).toString(16));
            result.push(color);
        }
        return result;
    }

    constructProductsBarChart = () => {
        const canvas: HTMLCanvasElement = document.getElementById('myProductsBarChart') as HTMLCanvasElement;
        const colors = this.getRandomHexColors(50);
        if (canvas) {
            const context = canvas.getContext('2d');
            new window.Chart(context, {
                type: 'bar',
                data: {
                    labels: this.props.products.map(product => product.category),
                    datasets: [{
                        label: "Top Selling Products",
                        backgroundColor: colors,
                        borderColor: colors,
                        data: this.props.products.map(product => product.saleCount)
                    }]
                },
                options: {}
            });
        }
    }

    constructTransactionsPerProductBarChart = () => {
        const transactions = new Map<string, Transaction>();
        this.props.transactions.map(transaction => {
            if (transactions.has(transaction.product)) {
                const t = transactions.get(transaction.product);
                if (t) {
                    t.quantity += transaction.quantity;
                    transactions.set(transaction.product, t);
                }
            } else {
                transactions.set(transaction.product, transaction);
            }
        });
        const canvas: HTMLCanvasElement = document.getElementById('myTransactionsPerProductBarChart') as HTMLCanvasElement;
        if (canvas) {
            const context = canvas.getContext('2d');
            new window.Chart(context, {
                type: 'line',
                data: {
                    labels: [...transactions.values()].map(transaction => transaction.product),
                    datasets: [{
                        label: "Transactions per Product",
                        backgroundColor: 'transparent',
                        borderColor: '#007BFF',
                        data: [...transactions.values()].map(transaction => transaction.quantity)
                    }]
                },
                options: {}
            });
        }
    }

    constructTransactionsPerVendorBarChart = () => {
        const transactions = new Map<string, Transaction>();
        this.props.transactions.map(transaction => {
            if (transactions.has(transaction.vendor)) {
                const t = transactions.get(transaction.vendor);
                if (t) {
                    t.quantity += transaction.quantity;
                    transactions.set(transaction.vendor, t);
                }
            } else {
                transactions.set(transaction.vendor, transaction);
            }
        });
        const canvas: HTMLCanvasElement = document.getElementById('myTransactionsPerVendorBarChart') as HTMLCanvasElement;
        const colors = this.getRandomHexColors(50);
        if (canvas) {
            const context = canvas.getContext('2d');
            new window.Chart(context, {
                type: 'pie',
                data: {
                    labels: [...transactions.values()].map(transaction => transaction.vendor),
                    datasets: [{
                        label: "Transactions per Vendor",
                        backgroundColor: colors,
                        borderColor: colors,
                        data: [...transactions.values()].map(transaction => transaction.quantity)
                    }]
                },
                options: {}
            });
        }
    }

}

const mapStateToProps = (state) => {
    return {
        isLoading: state.reducer.isLoading,
        products: state.reducer.products,
        transactions: state.reducer.transactions
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        showLoader: () => dispatch(MyActionCreators.showLoader()),
        hideLoader: () => dispatch(MyActionCreators.hideLoader()),
        getProductsStarted: () => dispatch(MyActionCreators.getProductsStarted()),
        getProductsCompleted: (products: Product[]) => dispatch(MyActionCreators.getProductsCompleted(products)),
        getProductsRejected: () => dispatch(MyActionCreators.getProductsRejected()),
        getTransactionsStarted: () => dispatch(MyActionCreators.getTransactionsStarted()),
        getTransactionsCompleted: (transactions: Transaction[]) => dispatch(MyActionCreators.getTransactionsCompleted(transactions)),
        getTransactionsRejected: () => dispatch(MyActionCreators.getTransactionsRejected())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HttpStatusGuard(MyDashboard));