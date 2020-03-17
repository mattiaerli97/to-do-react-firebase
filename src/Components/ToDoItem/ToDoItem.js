import React from 'react'
import './ToDoItem.css'

class ToDoItem extends React.Component {
    render() {
        let className = 'todo-item'
        if (this.props.lastItem) {
            className += ' last-item'
        }
        if (this.props.item.completed) {
            className += ' completed'
        }
        return(
            <div className={className}>
                <input
                    id={'checkbox_' + this.props.item.id} 
                    type="checkbox" 
                    checked={this.props.item.completed}
                    onChange={(event) => this.props.handleChange(this.props.item)}
                ></input>
                <label 
                    htmlFor={'checkbox_' + this.props.item.id}
                    data-content={this.props.item.text}
                >{this.props.item.text}</label>
            </div>
        )
    }
}

export default ToDoItem