import React from 'react';
import './Modal.css'
import Button from '../Button/Button'

function Header() {
    return null
}

function Body() {
    return null
}

function Footer() {
    return null
}

class Modal extends React.Component {
    static Header = Header
    static Body = Body
    static Footer = Footer
    render() {
        const {children} = this.props
        const header = children.find(child => child.type === Header)
        const body = children.find(child => child.type === Body)
        const footer = children.find(child => child.type === Footer)
        if (!this.props.show) {
            return null;
        }
        return (
            <div>
                <div className='overlay'></div>
                <div className='modal' id="modal">
                    <div className='modal-container'>
                        <h2>{header ? header.props.children : null}</h2>
                        <div className='content'>{body ? body.props.children : null}</div>
                        <div className='actionsModal'>
                            { footer ? footer.props.children : null }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Modal