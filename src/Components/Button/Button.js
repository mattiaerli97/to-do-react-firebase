import React from 'react';
import './Button.css'

class Button extends React.Component {
    render() {

        let className = 'button'
        if (this.props.type) {
            className += ' ' + this.props.type
        }

        return (
            <button 
                className={className}
                onClick={(event) => this.props.handleClick()}
            >{this.props.text}</button>
        )
    }
}

export default Button