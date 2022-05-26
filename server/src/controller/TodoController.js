import { TODO_PATH } from "../routes";
import TodoService from "../service/TodoService";

export default function TodoController() {

    const todoService = TodoService();

    const listTodos = (req, res, next) => {
        todoService.findAll()
            .then(todos => res.json({ results: todos }))
            .catch(next);
    }
    
    const findTodo = (req, res, next) => {
        const { id } = req.params;
    
        todoService.findById(id)
            .then(todo => res.json(todo))
            .catch(next);
    }
    
    const newTodo = (req, res, next) => {    
        const { task } = req.body;
    
        todoService.create(task)
            .then(todo => {
    
                const { _id } = todo;
    
                res
                    .location(`${TODO_PATH}/${_id}`)
                    .status(201)
                    .json({ todo });
            })
            .catch(next);
    }
    
    const updateTodoById = (req, res, next) => {
        const { id } = req.params;
        const { task } = req.body;
    
        todoService.updateById(task, id)
            .then(updatedTodo => {
                const { _id: id } = updatedTodo;
    
                res
                    .location(`${TODO_PATH}/${id}`)
                    .status(200)
                    .json({ id });
            })
            .catch(next);
    }
    
    const updateTodoStatusById = (req, res, next) => {
        const { status } = req.body;
        const { id } = req.params;
    
        todoService.updateStatusById(status, id)
            .then(updatedTodo => {            
                const { _id: id} = updatedTodo;
    
                res
                    .location(`${TODO_PATH}/${id}`)
                    .status(200)
                    .json({ id });
            })
            .catch(next);
    }
    
    const deleteTodoById = (req, res, next) => {
        const { id } = req.params;
    
        todoService.deleteById(id)
            .then(id => {
                res
                    .status(200)
                    .json({ id });
            })
            .catch(next);
    }

    return { listTodos, findTodo, newTodo, updateTodoById, updateTodoStatusById, deleteTodoById };
}