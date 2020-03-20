import React from 'react'
import ToDoItem from '../ToDoItem/ToDoItem'
import Loader from '../Loader/Loader'
import Button from '../Button/Button'
import Toast from '../Toast/Toast'
import Modal from '../Modal/Modal'
import { dataBaseRef } from '../../api.js';
import './MainContent.css'

class MainContent extends React.Component {
    constructor() {
        super()
        this.state = {
            todos: [],
            loading: false,
            viewCompleted: false,
            showModal: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.retriveData = this.retriveData.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.setDataAfterRetrieve = this.setDataAfterRetrieve.bind(this);
        this.handleShowModal = this.handleShowModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
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
            />
            )

        let loader = this.state.loading;

        return (
            <div>
                <Modal 
                    show={this.state.showModal}
                    closeModal={this.closeModal}
                >Test children</Modal>
                <div className="todo-list">
                    {!loader ? todoItems : <Loader />}
                </div>
                <div className="button-slot">
                    <Button 
                        text={this.state.viewCompleted ? 'Hide completed' : 'Show completed' }
                        handleClick={this.handleClick}
                    />
                    <Button text="Add Todo"/>
                    <Button 
                        handleClick={this.handleShowModal} 
                        text="show Modal"
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
                        app.messageComponent.showToast(todo.completed ? 'Todo checked' : 'Todo unchecked')
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

    handleShowModal() {
        this.setState(prevState => {
            let newState = prevState;
            newState.showModal = true;
            return newState;
        })
    }

    closeModal() {
        this.setState(prevState => {
            let newState = prevState;
            newState.showModal = false;
            return newState;
        })
    }
}

export default MainContent