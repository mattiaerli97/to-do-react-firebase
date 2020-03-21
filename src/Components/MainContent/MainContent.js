import React from 'react'
import ToDoItem from '../ToDoItem/ToDoItem'
import Loader from '../Loader/Loader'
import Button from '../Button/Button'
import Toast from '../Toast/Toast'
import Modal from '../Modal/Modal'
import { dataBaseRef } from '../../api.js';
import CheckCircleOutline from '@material-ui/icons/CheckCircleOutline';
import Delete from '@material-ui/icons/Delete';
import './MainContent.css'

class MainContent extends React.Component {
    constructor() {
        super()
        this.state = {
            todos: [],
            loading: false,
            viewCompleted: false,
            showModalDelete: false,
            idToConfirm: null,
            showModalAddUpdate: false,
            isUpdate: false,
            valueText: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.retriveData = this.retriveData.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.setDataAfterRetrieve = this.setDataAfterRetrieve.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.deleteTodo = this.deleteTodo.bind(this);
        this.confirmDelete = this.confirmDelete.bind(this);
        this.closeModalAddUpdate = this.closeModalAddUpdate.bind(this);
        this.handleShowModalAddUpdate = this.handleShowModalAddUpdate.bind(this);
        this.updateInput = this.updateInput.bind(this);
        this.saveTodo = this.saveTodo.bind(this);
    }

    componentDidMount() {
        this.retriveData();
    }

    render() {
        const todoItems = this.state.todos.map((item, idx) =>
            <ToDoItem 
                key={item.id} 
                lastItem={idx === this.state.todos.length - 1} 
                item={item} 
                handleChange={this.handleChange}
                handleDelete={this.deleteTodo}
            />
            )

        let loader = this.state.loading;

        return (
            <div>
                <Modal 
                    show={this.state.showModalDelete}
                >
                    <Modal.Header>
                        DELETE TODO
                    </Modal.Header>
                    <Modal.Body>
                        Are you sure you want to delete this todo?
                        This is an irreversible operation
                    </Modal.Body>
                    <Modal.Footer>
                        <Button 
                            text='Confirm' 
                            handleClick={this.confirmDelete} 
                        />
                        <Button 
                            text='Close'
                            type='secondary'
                            handleClick={this.closeModal} 
                        />
                    </Modal.Footer>
                </Modal>

                <Modal 
                    show={this.state.showModalAddUpdate}
                >
                    <Modal.Header>
                        {this.state.isUpdate ? 'UPDATE TODO' : 'CREATE TODO'}
                    </Modal.Header>
                    <Modal.Body>
                        {this.state.isUpdate ? 
                            'update body' : 
                            <div>
                                <label 
                                    htmlFor='new_todo'
                                ><b>New Todo</b></label>
                                <input
                                    value={this.state.valueText}
                                    id='new_todo' 
                                    type='text'
                                    onChange={this.updateInput}
                                ></input>
                            </div>
                        }
                    </Modal.Body>
                    <Modal.Footer>
                        <Button 
                            handleClick={this.state.isUpdate ? null : this.saveTodo}
                            text={this.state.isUpdate ? 'Update' : 'Create'}
                        />
                        <Button 
                            text='Close'
                            type='secondary'
                            handleClick={this.closeModalAddUpdate} 
                        />
                    </Modal.Footer>
                </Modal>
                <div className="todo-list">
                    {!loader ? todoItems : <Loader />}
                </div>
                <div className="button-slot">
                    <Button 
                        text={this.state.viewCompleted ? 'Hide completed' : 'Show completed' }
                        handleClick={this.handleClick}
                    />
                    <Button 
                        text="Add Todo" 
                        handleClick={this.handleShowModalAddUpdate}
                    />
                </div>
                <Toast ref={(c) => this.messageComponent = c} />
            </div>
        )
    }

    handleChange(item) {
        let app = this;
        this.setState(prevState => {
            const newTodos = prevState.todos.map(todo => {
                if (todo.id === item.id) {
                    todo.completed = !todo.completed
                    dataBaseRef.doc(item.id).update(
                        {
                            text: item.text,
                            completed: todo.completed
                        }
                    ).then(function() {
                        app.messageComponent.showToast(
                            <CheckCircleOutline />, 
                            todo.completed ? 'Todo checked' : 'Todo unchecked')
                        app.retriveData();
                    });
                }
                return todo;
            })
            return newTodos
        })
    }

    handleClick() {
        this.setState(prevState => {
            let newState = prevState;
            newState.viewCompleted = !newState.viewCompleted;
            return newState;
        }, () => {
            this.retriveData();
        })
    }

    retriveData() {
        this.setState(prevState => {
            let newState = prevState;
            newState.todos = [];
            newState.loading = true;
            return newState;
        })
        if (this.state.viewCompleted) {
            dataBaseRef.get().then(snapshot => {
                this.setDataAfterRetrieve(snapshot);
            }) 
        } else {
            dataBaseRef.where("completed", "==", false).get().then(snapshot => {
                this.setDataAfterRetrieve(snapshot);
            })
        }
    }

    setDataAfterRetrieve(snapshot) {
        let todos = [];
        snapshot.forEach(todo => {
            todos.push({
                id: todo.id,
                text: todo.data().text,
                completed: todo.data().completed
            });
        })
        this.setState(prevState => {
            let newState = prevState;
            newState.todos = todos;
            newState.loading = false;
            return newState;
        })
    }

    closeModal() {
        this.setState(prevState => {
            let newState = prevState;
            newState.showModalDelete = false;
            newState.idToConfirm = null;
            return newState;
        })
    }

    deleteTodo(item) {
        this.setState(prevState => {
            let newState = prevState;
            newState.showModalDelete = true;
            newState.idToConfirm = item.id; 
            return newState;
        })
    }

    confirmDelete() {
        let app = this;
        dataBaseRef.doc(this.state.idToConfirm).delete().then(() => {
            this.retriveData();
            this.closeModal();
            app.messageComponent.showToast(
                <Delete />, 
                'todo deleted succesfully'
            )
        })
    }

    closeModalAddUpdate() {
        this.setState(prevState => {
            let newState = prevState;
            newState.showModalAddUpdate = false;
            newState.valueText = '';
            return newState;
        })
    }

    handleShowModalAddUpdate() {
        this.setState(prevState => {
            let newState = prevState;
            newState.showModalAddUpdate = true;
            return newState;
        })
    }

    saveTodo() {
        let app = this;
        dataBaseRef.add({
            text: app.state.valueText,
            completed: false
        }).then(() => {
            this.retriveData();
            this.closeModalAddUpdate();
        })
    }

    updateInput(event) {
        let val = event.target.value;
        this.setState(prevState => {
            let newState = prevState;
            newState.valueText = val; 
            return newState;
        })
    }
}

export default MainContent