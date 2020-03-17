import React from 'react'
import ToDoItem from '../ToDoItem/ToDoItem'
import Loader from '../Loader/Loader'
import Button from '../Button/Button'
import { dataBaseRef } from '../../api.js';
import './MainContent.css'

class MainContent extends React.Component {
    constructor() {
        super()
        this.state = {
            todos: [],
            loading: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.retriveData = this.retriveData.bind(this);
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

        if (!loader) {
            return (
                <div>
                    <div className="todo-list">
                        {todoItems}
                    </div>
                    <div className="button-slot">
                        <Button />
                        <Button />
                    </div>
                </div>
            )
        } else {
            return (
                <div className="todo-list">
                    <Loader />
                </div>
            )
        }
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
                        alert("Todo succesfully updated");
                        app.retriveData();
                    });
                }
                return todo;
            })
            return newTodos
        })
    }

    retriveData() {
        let todos = [];
        this.setState(prevState => {
            let newState = prevState;
            newState.todos = todos;
            newState.loading = true;
            return newState;
        })
        dataBaseRef.where("completed", "==", false).get().then(snapshot => {
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
        })
    }
}

export default MainContent