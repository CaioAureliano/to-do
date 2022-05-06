import { Todo } from "../model/todo";
import HttpNotFoundError from "../errors/HttpNotFoundError";
import HttpInternalServerError from "../errors/HttpInternalServerError";
import HttpBadRequestError from "../errors/HttpBadRequestError";

export default function TodoService() {

    const findAll = async () => {
        const results = await Todo
                .find()
                .sort({ createdAt: -1 });
    
        console.log(`found ${results.length} to-do's`);
    
        return results;
    }
    
    const findById = async (id) => {
        const todo = await findByIdOrThrowNotFound(id);
        
        console.log(`to-do found: ${JSON.stringify(todo)}`);
    
        return todo;
    }
    
    const create = async (task) => {
        existsProperties(task);
    
        const doc = new Todo({ task });
    
        const newTodo = await doc.save()
            .catch(err => {
                throw new HttpInternalServerError(err.message);
            });
    
        console.log(`new to-do created: ${JSON.stringify(newTodo)}`);
    
        return newTodo;
    }
    
    const updateById = async (task, id) => {
        existsProperties(task);
    
        const todoFound = await findByIdOrThrowNotFound(id);
        todoFound.task = task;
        todoFound.updatedAt = Date.now();

        const todoUpdated = await todoFound.save()
            .catch(err => {
                throw new HttpInternalServerError(err.message);
            });
    
        console.log(`to-do updated: ${JSON.stringify(todoUpdated)}`);
    
        return todoUpdated;
    }
    
    const updateStatusById = async (status, id) => {
        existsProperties(status);
    
        const todoFound = await findByIdOrThrowNotFound(id);
        todoFound.status = status;
        todoFound.updatedAt = Date.now();

        const todoUpdated = await todoFound.save().catch(err => { 
            throw new HttpBadRequestError(err.message);
        });
    
        console.log(`to-do status updated to:"${status}" - to-do: ${JSON.stringify(todoUpdated)}`);
    
        return todoUpdated;
    }
    
    const deleteById = async (_id) => {
        await findByIdOrThrowNotFound(_id);
    
        const { deletedCount } = await Todo.deleteOne({ _id });
        if (!deletedCount) {
            throw new HttpInternalServerError(`cannot remove to-do with id: ${_id}`);
        }
    
        console.log(`deleted to-do with id: ${_id}`);
    
        return _id;
    }
    
    const existsProperties = (...properties) => {
        for (let prop of properties) {
            if (prop === undefined || prop === null) {
                throw new HttpBadRequestError("not found or invalid properties");
            }
        }
    }
    
    const findByIdOrThrowNotFound = async (id) => {
        return await Todo.findById(id).catch(err => {
            throw new HttpNotFoundError(`not found to-do with id ${id}`);
        });
    }

    return { findAll, findById, create, updateById, updateStatusById, deleteById };
}