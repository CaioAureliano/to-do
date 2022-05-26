import React from 'react';
import './App.css';
import Header from './modules/header/components/Header';
import ListItems from './modules/todo/components/List';
import TodoService from './service/TodoService';

export default class App extends React.Component {

    constructor(props) {
        super(props);

        this.todoService = TodoService();

        this.state = { 
            todos: [],
            inputNewTodoValue: ''
        };

        this.handleInputNewTodo = this.handleInputNewTodo.bind(this);
        this.handleSubmitNewTodo = this.handleSubmitNewTodo.bind(this);
        this.updateTodo = this.updateTodo.bind(this);
        this.deleteTodo = this.deleteTodo.bind(this);
        this.updateStatusById = this.updateStatusById.bind(this);
    }

    componentDidMount() {
        this.todoService
            .getAll()
            .then(response => {
                this.setState({
                    todos: this.orderTodosByStatus(response.data.results)
                });
            });
    }

    handleInputNewTodo(e) {
        this.setState({ inputNewTodoValue: e.target.value });
    }

    handleSubmitNewTodo(e) {
        e.preventDefault();

        this.todoService.create(this.state.inputNewTodoValue)
            .then(response => {
                const { todo: createdTodo } = response.data;

                this.setState({
                    inputNewTodoValue: '',
                    todos: [createdTodo, ...this.state.todos]
                });
            })
            .catch(error => console.error('ops', error));        
    }

    updateTodo(event, itemId, currentTask) {
        const todoInputValue = event.target.value;
        if (todoInputValue !== currentTask) {
            this.todoService.updateById(todoInputValue, itemId)
                .then(response => console.log(response))
                .catch(error => console.error(`can't update to-do`, error))
        }
    }

    deleteTodo(id) {
        const updatedTodos = this.state.todos.filter(todo => todo._id !== id);
        this.setState({ todos: [...updatedTodos] })
        
        this.todoService.deleteById(id)
            .then(response => console.log(response))
            .catch(error => console.error(`can't delete item`, error));
    }

    updateStatusById(event, id) {
        const { checked } = event.target;
        this.todoService.updateStatusById(checked, id)
            .then(response => console.log(response))
            .catch(error => console.error(`can't update status`, error));
    }

    orderTodosByStatus(todos) {
        return todos.length > 0 && todos.sort((a, b) => {
            if (!a.status && b.status) {
                return -1;
            }

            return 0;
        });
    }

    render() {
        return (
        <div className='content'>
            <Header 
                inputNewTodoValue={this.state.inputNewTodoValue}
                handleInputNewTodo={this.handleInputNewTodo}
                handleSubmit={this.handleSubmitNewTodo} />

            <ListItems 
                updateItemStatus={this.updateStatusById}
                deleteItem={this.deleteTodo}
                updateItem={this.updateTodo}
                todos={this.state.todos} />
        </div>
        );
    }

}