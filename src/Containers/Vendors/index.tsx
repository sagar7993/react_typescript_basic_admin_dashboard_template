import * as React from 'react';
import { connect } from 'react-redux';

import WrappingComponent from '../../Components/HigherOrderComponents/WrappingComponent';
import HttpStatusGuard from '../../Services/RouteGuards/HttpStatusGuard';

import './Vendors.css';

import MyLoader from '../../Components/UI/Loader';

import { MyActionCreators } from '../../Actions';

import { getVendors } from '../../Services/MyService';

import { Vendor, MyWindow } from '../../Contracts';

declare var window: MyWindow;

export interface Props {
    isLoading: boolean;
    showLoader: any;
    hideLoader: any;
    vendors: Vendor[];
    getVendorsStarted: any;
    getVendorsCompleted: any;
    getVendorsRejected: any;
}

export interface State { }

export class Vendors extends React.Component<Props, State> {

    state: State = {};

    render() {
        return (
            <WrappingComponent>
                {(!this.props.isLoading && this.props.vendors && this.props.vendors.length > 0) &&
                    <WrappingComponent>
                        <div className="row">
                            <h3 className="center">My Vendors</h3>
                        </div>
                        <div className="row">
                            <div className="col s12">
                                <div className="row valign-wrapper">
                                    <div className="col s5 offset-s1">
                                        <div className="input-field">
                                            <i className="material-icons prefix">textsms</i>
                                            <input type="text" id="autocomplete-input" className="autocomplete" />
                                            <label htmlFor="autocomplete-input">Autocomplete</label>
                                        </div>
                                    </div>
                                    <div className="col s5 offset-s1">
                                        <button onClick={() => this.downloadCsvForVendor(this.props.vendors)} className="btn btn-primary">Download All</button>
                                    </div>
                                </div>
                            </div>
                            <div className="col s12">
                                <table className="highlight centered responsive-table">
                                    <thead>
                                        <tr>
                                            <th>Vendor Name</th>
                                            <th>Channel Partners</th>
                                            <th>Invoice Status</th>
                                            <th>Invoice Amount</th>
                                            <th>Download Invoice</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.props.vendors.map(vendor => {
                                            const paymentStatus = vendor.paymentStatus === true ? 'Paid' : (vendor.paymentStatus === false ? 'Unpaid' : 'Delayed');
                                            const paymentStatusClass = 'payment-status ' + (vendor.paymentStatus === true ? 'paid' : (vendor.paymentStatus === false ? 'unpaid' : 'delayed'));
                                            return (
                                                <tr key={vendor.id}>
                                                    <td>{vendor.name}</td>
                                                    <td>{vendor.channelPartnerCount}</td>
                                                    <td><div className={paymentStatusClass}>{paymentStatus}</div></td>
                                                    <td>₹ {vendor.invoiceAmount}</td>
                                                    <td><button onClick={() => this.downloadCsvForVendor(vendor)} className="btn btn-primary">Download</button></td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </WrappingComponent>
                }
                {(this.props.isLoading || !this.props.vendors || this.props.vendors.length === 0) &&
                    <MyLoader />
                }
            </WrappingComponent>
        );
    }

    componentDidMount() {
        this.props.showLoader();
        this.props.getVendorsStarted();
        getVendors().then(vendors => {
            setTimeout(() => {
                const vendorNames = {};
                for (const vendor of vendors) {
                    vendorNames[vendor.name] = null;
                }
                const elems = document.querySelectorAll('.autocomplete');
                window.M.Autocomplete.init(elems, {
                    data: vendorNames,
                    minLength: 2,
                    sortFunction: (a, b, inputString) => {
                        return a.indexOf(inputString) - b.indexOf(inputString);
                    }
                });
            }, 0);
            this.props.hideLoader();
            this.props.getVendorsCompleted(vendors);
        }).catch(error => {
            this.props.hideLoader();
            this.props.getVendorsRejected();
        });
    }

    downloadCsvForVendor = (vendor: Vendor | Vendor[]) => {
        const vendors = [...vendor];
        const vendorNames = vendors.length === 1 ? vendors[0].name : 'AllVendorsReport';
        const rows = [['Name', 'Channel Partners', 'Invoice Status', 'Invoice Amount']];
        let csvContent = "data:text/csv;charset=utf-8,";
        vendors.map(vendor => {
            const paymentStatus = vendor.paymentStatus === true ? 'Paid' : (vendor.paymentStatus === false ? 'Unpaid' : 'Delayed');
            rows.push([vendor.name.replace(/,/g, ''), vendor.channelPartnerCount.toString(), paymentStatus.toString(), vendor.invoiceAmount.toString()]);
        });
        rows.forEach((rowArray) => {
            const row = rowArray.join(",");
            csvContent += row + "\r\n";
        });
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute('href', encodedUri);
        link.setAttribute('download', vendorNames + '.csv');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

}

const mapStateToProps = (state) => {
    return {
        isLoading: state.reducer.isLoading,
        vendors: state.reducer.vendors
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        showLoader: () => dispatch(MyActionCreators.showLoader()),
        hideLoader: () => dispatch(MyActionCreators.hideLoader()),
        getVendorsStarted: () => dispatch(MyActionCreators.getVendorsStarted()),
        getVendorsCompleted: (vendors: Vendor[]) => dispatch(MyActionCreators.getVendorsCompleted(vendors)),
        getVendorsRejected: () => dispatch(MyActionCreators.getVendorsRejected())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HttpStatusGuard(Vendors));