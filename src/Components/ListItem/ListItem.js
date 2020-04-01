import React from 'react';
import './ListItem.css';

class ListItem extends React.Component {
    render() {
        return (
            <div className = 'list-item'>
                <label>{this.props.item.name}</label>
            </div>
        )
    }
}

export default ListItem