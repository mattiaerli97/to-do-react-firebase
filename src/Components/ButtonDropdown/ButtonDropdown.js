import React from 'react';
import './ButtonDropdown.css'
import Button from '../Button/Button'

class ButtonDropdown extends React.Component {
    render() {
        return(
            <div className="dropdown">
                <span><Button /></span>
                <div className="dropdown-content">
                    <p>Modifica</p>
                    <hr />
                    <p>Elimina</p>
                </div>
            </div>
        )
    }
}

export default ButtonDropdown