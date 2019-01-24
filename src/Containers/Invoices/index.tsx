import * as React from 'react';
import { connect } from 'react-redux';

import WrappingComponent from '../../Components/HigherOrderComponents/WrappingComponent';
import HttpStatusGuard from '../../Services/RouteGuards/HttpStatusGuard';

import './Invoices.css';

import MyLoader from '../../Components/UI/Loader';

import { MyActionCreators } from '../../Actions';

import { getSubscriptions } from '../../Services/MyService';

import { Subscription, MyWindow } from '../../Contracts';

declare var window: MyWindow;

export interface Props {
    isLoading: boolean;
    showLoader: any;
    hideLoader: any;
    subscriptions: Subscription[];
    getSubscriptionsStarted: any;
    getSubscriptionsCompleted: any;
    getSubscriptionsRejected: any;
}

export interface State {
    subscription: Subscription | null;
}

export class MyInvoices extends React.Component<Props, State> {

    state: State = {
        subscription: null
    };

    render() {
        return (
            <WrappingComponent>
                {(!this.props.isLoading && this.props.subscriptions && this.props.subscriptions.length > 0) &&
                    <WrappingComponent>
                        <div className="row">
                            <h3 className="center">Vendor{' <> '}Channel Partner Invoices</h3>
                        </div>
                        <div className="row">
                            <div className="col s12">
                                <table className="highlight centered responsive-table">
                                    <thead>
                                        <tr>
                                            <th>Vendor</th>
                                            <th>Product</th>
                                            <th>Invoice Amount</th>
                                            <th>View Invoice</th>
                                            <th>Download Invoice</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.props.subscriptions.map(subscription => {
                                            return (
                                                <tr key={subscription.id}>
                                                    <td>{subscription.vendor}</td>
                                                    <td>{subscription.productName}</td>
                                                    <td>₹ {subscription.totalAmount}</td>
                                                    <td><a onClick={() => this.viewInvoideForVendor(subscription)} className="btn btn-primary modal-trigger" href="#modal">View Invoice</a></td>
                                                    <td><button onClick={() => this.downloadInvoiceForVendor(subscription)} className="btn btn-primary">Download</button></td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </WrappingComponent>
                }
                {(this.props.isLoading || !this.props.subscriptions || this.props.subscriptions.length === 0) &&
                    <MyLoader />
                }
                <div id="modal" className="modal">
                    <div className="modal-content">
                        <h4 className="center">{(this.state.subscription && this.state.subscription.vendor) ? this.state.subscription.vendor : ''}</h4>
                        <table className="highlight centered responsive-table">
                            <thead>
                                <tr>
                                    <th>Product</th>
                                    <th>Quantity</th>
                                    <th>Amount/Unit</th>
                                    <th>Total Amount</th>
                                </tr>
                            </thead>
                            <tbody>
                                {(this.state.subscription && this.state.subscription.productName && this.state.subscription.productName.split(', ').length === 1) &&
                                    <tr>
                                        <td>{(this.state.subscription && this.state.subscription.productName) ? this.state.subscription.productName : ''}</td>
                                        <td>{(this.state.subscription && this.state.subscription.quantity) ? this.state.subscription.quantity : ''}</td>
                                        <td>₹ {(this.state.subscription && this.state.subscription.amountPerUnit) ? this.state.subscription.amountPerUnit : ''}</td>
                                        <td>₹ {(this.state.subscription && this.state.subscription.totalAmount) ? this.state.subscription.totalAmount : ''}</td>
                                    </tr>
                                }
                                {(this.state.subscription && this.state.subscription.productName && this.state.subscription.productName.split(', ').length > 1) &&
                                    this.state.subscription.productName.split(', ').map((productName, index) => {
                                        // const productNames = (this.state.subscription && this.state.subscription.productName && this.state.subscription.productName.length > 0) ? this.state.subscription.productName.split(', ') : '';
                                        const quantities = (this.state.subscription && this.state.subscription.quantity) ? this.state.subscription.quantity.toString().split(', ') : '';
                                        const amounts = (this.state.subscription && this.state.subscription.amountPerUnit) ? this.state.subscription.amountPerUnit.toString().split(', ') : '';
                                        return (
                                            <tr key={((new Date()).getTime().toString() + Math.random().toFixed(5)).replace(/\./, '')}>
                                                <td>{productName}</td>
                                                <td>{quantities[index]}</td>
                                                <td>₹ {amounts[index]}</td>
                                                <td>₹ {Number(quantities[index]) * Number(amounts[index])}</td>
                                            </tr>
                                        );
                                    })
                                }
                                {(this.state.subscription && this.state.subscription.productName && this.state.subscription.productName.split(', ').length > 1) &&
                                    <tr>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td>₹ {this.state.subscription.totalAmount}</td>
                                    </tr>
                                }
                            </tbody>
                        </table>
                    </div>
                    <div className="modal-footer">
                        <a href="javascript:void(0);" className="modal-close waves-effect waves-green btn-flat">Ok</a>
                    </div>
                </div>
            </WrappingComponent>
        );
    }

    componentDidMount() {
        this.props.showLoader();
        this.props.getSubscriptionsStarted();
        getSubscriptions().then(subscriptions => {
            setTimeout(() => {
                const elems = document.querySelectorAll('.modal');
                window.M.Modal.init(elems, {});
            }, 0);
            this.props.hideLoader();
            const subscriptionMap = new Map<string, Subscription>();
            let sortedSubscriptions = subscriptions;
            sortedSubscriptions.map((subscription) => {
                if (subscriptionMap.has(subscription.vendor)) {
                    const s = subscriptionMap.get(subscription.vendor);
                    if (s) {
                        subscriptionMap.set(subscription.vendor, {
                            id: (new Date()).getTime().toString(),
                            createdAt: (new Date()).getTime().toString(),
                            quantity: s.quantity + ', ' + subscription.quantity,
                            amountPerUnit: s.amountPerUnit + ', ' + subscription.amountPerUnit,
                            product: s.product + ', ' + subscription.product,
                            productName: s.productName + ', ' + subscription.productName,
                            vendor: subscription.vendor,
                            totalAmount: s.totalAmount + (Number(subscription.quantity) * Number(subscription.amountPerUnit))
                        });
                    }
                } else {
                    subscriptionMap.set(subscription.vendor, {
                        id: ((new Date()).getTime().toString() + Math.random().toFixed(5)).replace(/\./, ''),
                        createdAt: (new Date()).getTime().toString(),
                        quantity: subscription.quantity,
                        amountPerUnit: subscription.amountPerUnit,
                        product: subscription.product,
                        productName: subscription.productName,
                        vendor: subscription.vendor,
                        totalAmount: Number(subscription.quantity) * Number(subscription.amountPerUnit)
                    });
                }
            });
            sortedSubscriptions = [...subscriptionMap.values()];
            this.props.getSubscriptionsCompleted(sortedSubscriptions);
        }).catch(error => {
            this.props.hideLoader();
            this.props.getSubscriptionsRejected();
        });
    }

    downloadInvoiceForVendor = (subscription: Subscription) => {
        const rows = [['Product', 'Quantity', 'Amount', 'Total Amount']];
        let csvContent = "data:text/csv;charset=utf-8,";
        const productNames = subscription.productName.split(', ');
        const quantities = subscription.quantity.toString().split(', ');
        const amounts = subscription.amountPerUnit.toString().split(', ');
        if (productNames && productNames.length > 1) {
            for (let i = 0; i < productNames.length; i++) {
                rows.push([productNames[i].replace(/,/g, '\t'), quantities[i].toString().replace(/,/g, '\t'), amounts[i].toString().replace(/,/g, '\t'), '']);
            }
            rows.push(['', '', '', subscription.totalAmount.toString()]);
        } else {
            rows.push([subscription.productName.replace(/,/g, '\t'), subscription.quantity.toString().replace(/,/g, '\t'), subscription.amountPerUnit.toString().replace(/,/g, '\t'), subscription.totalAmount.toString().replace(/,/g, '\t')]);
        }
        rows.forEach((rowArray) => {
            const row = rowArray.join(",");
            csvContent += row + "\r\n";
        });
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute('href', encodedUri);
        link.setAttribute('download', subscription.vendor + '.csv');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    viewInvoideForVendor = (subscription: Subscription) => {
        this.setState({
            subscription
        });
    }

}

const mapStateToProps = (state) => {
    return {
        isLoading: state.reducer.isLoading,
        subscriptions: state.reducer.subscriptions
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        showLoader: () => dispatch(MyActionCreators.showLoader()),
        hideLoader: () => dispatch(MyActionCreators.hideLoader()),
        getSubscriptionsStarted: () => dispatch(MyActionCreators.getSubscriptionsStarted()),
        getSubscriptionsCompleted: (subscriptions: Subscription[]) => dispatch(MyActionCreators.getSubscriptionsCompleted(subscriptions)),
        getSubscriptionsRejected: () => dispatch(MyActionCreators.getSubscriptionsRejected())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HttpStatusGuard(MyInvoices));