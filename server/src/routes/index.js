import { Router } from "express";
import TodoController, { deleteTodoById, findTodo, listTodos, newTodo, updateTodoById, updateTodoStatusById } from "../controller/TodoController";

export const TODO_PATH = "/todo";

const todoController = TodoController();

const routes = new Router();

routes.get(TODO_PATH, todoController.listTodos);
routes.post(TODO_PATH, todoController.newTodo);
routes.get(`${TODO_PATH}/:id`, todoController.findTodo);
routes.patch(`${TODO_PATH}/:id`, todoController.updateTodoById);
routes.patch(`${TODO_PATH}/:id/status`, todoController.updateTodoStatusById);
routes.delete(`${TODO_PATH}/:id`, todoController.deleteTodoById);

export default routes;