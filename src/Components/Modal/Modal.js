import React from 'react';
import './Modal.css'
import Button from '../Button/Button'

class Modal extends React.Component {
    render() {
        if (!this.props.show) {
            return null;
        }
        return (
            <div>
                <div className='overlay'></div>
                <div className='modal' id="modal">
                    <div className='modal-container'>
                        <h2>Modal window</h2>
                        <div className='content'>{this.props.children}</div>
                        <div className='actionsModal'>
                            <Button className='toggle-button' handleClick={this.props.closeModal} />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Modal