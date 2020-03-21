import React from 'react'
import './ToDoItem.css'
import CancelIcon from '@material-ui/icons/Cancel';
import CreateIcon from '@material-ui/icons/Create';

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
                <div>
                    <input
                        id={'checkbox_' + this.props.item.id} 
                        type="checkbox" 
                        checked={this.props.item.completed}
                        onChange={(event) => this.props.handleChange(this.props.item)}
                    ></input>
                </div>
                <div className='label-section'>
                    <label 
                        htmlFor={'checkbox_' + this.props.item.id}
                        data-content={this.props.item.text}
                    >{this.props.item.text}</label>
                </div>
                <div className='actions'>
                    { !this.props.item.completed && 
                        <CreateIcon 
                            onClick={(event) => this.props.handleUpdate(this.props.item)} 
                        /> 
                    }
                    { this.props.item.completed && <div className='fake-div'></div> }
                    <CancelIcon onClick={(event) => this.props.handleDelete(this.props.item)} />
                </div>
            </div>
        )
    }
}

export default ToDoItem