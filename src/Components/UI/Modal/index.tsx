import * as React from 'react';

import WrappingComponent from '../../../Components/HigherOrderComponents/WrappingComponent';

import { MyWindow } from '../../../Contracts';

declare var window: MyWindow;

interface Props { }

interface State { }

export class MyModal extends React.Component<Props, State> {

    state: State = {};

    render() {
        return (
            <WrappingComponent>
                <div id="modal" className="modal">
                    <div className="modal-content">
                        <h4>Modal Header</h4>
                        <p>A bunch of text</p>
                    </div>
                    <div className="modal-footer">
                        <a href="javascript(0);" className="modal-close waves-effect waves-green btn-flat">Agree</a>
                    </div>
                </div>
            </WrappingComponent>
        );
    }

    componentDidMount() {
        setTimeout(() => {
            const elems = document.querySelectorAll('.modal');
            window.M.Modal.init(elems, {});
        }, 0);
    }

}

export default MyModal;