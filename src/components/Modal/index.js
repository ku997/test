import { Component } from 'react';
import ReactDOM from 'react-dom';
import "./style.scss";

class Modal extends Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        return ReactDOM.createPortal(
            <div className="modal__content">
                <div className="modal__content-bg" onClick={this.props.modalCloseFoo}></div>
                <div className='modal__content-form'>
                    <div className="modal__content-close" onClick={this.props.modalCloseFoo}>X</div>
                    {this.props.children}
                </div>
            </div>,
            document.getElementById("modal")
        );
    }
}

export default Modal;