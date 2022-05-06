import "regenerator-runtime/runtime";
import { Todo } from "../../src/model/todo";
import TodoService from "../../src/service/TodoService";

describe("to-do service", () => {

    const todoService = TodoService();

    describe("create", () => {
        test("should create new to-do", async () => {
            const taskMock = "refactoring";

            const createdTodo = await todoService.create(taskMock);
            
            expect(createdTodo.task).toBe(taskMock);
            expect(createdTodo.status).not.toBeTruthy();
            expect(createdTodo).toEqual(expect.objectContaining({
                task: expect.any(String),
                status: expect.any(Boolean),
                createdAt: expect.any(Date),
                updatedAt: expect.any(Date),
            }));
        });

        test("should throw error with invalid task", () => {
            expect(async () => await todoService.create("")).rejects.toThrow();
            expect(async () => await todoService.create(null)).rejects.toThrow();
            expect(async () => await todoService.create(undefined)).rejects.toThrow();
        });
    });

    describe("find by id", () => {

        let todo;

        beforeAll(async () => {
            todo = await Todo.create({ task: "learn js" });
        });

        test("should return a to-do with valid ID", async () => {
            const { _id } = todo;

            const foundTodo = await todoService.findById(_id);
            expect(foundTodo._id.toString()).toBe(_id.toString());
            expect(foundTodo.task).toBe("learn js");
            expect(foundTodo.status).not.toBeTruthy();
            expect(foundTodo).toEqual(expect.objectContaining({
                task: expect.any(String),
                status: expect.any(Boolean),
                createdAt: expect.any(Date),
                updatedAt: expect.any(Date),
            }));
        });

    });

    describe("update by id", () => {

        let todo;

        beforeAll(async () => {
            todo = await Todo.create({ task: "eat" });
        });

        test("should update to-do with valid task", async () => {
            const expectedTask = "finish job";
            const { _id } = todo;

            const todoUpdated = await todoService.updateById(expectedTask, _id);

            const foundTodo = await Todo.findById(_id);

            expect(todoUpdated.task).toBe(expectedTask);
            expect(foundTodo.task).toBe(expectedTask);
        });

        test("should update with invalid task", () => {
            const { _id } = todo;

            expect(async () => await todoService.updateById("", _id)).rejects.toThrow();
            expect(async () => await todoService.updateById(undefined, _id)).rejects.toThrow();
            expect(async () => await todoService.updateById(null, _id)).rejects.toThrow();
        });
        
        test("should update with not exists id", () => {
            expect(async () => await todoService.updateById("my mind", "abc123")).rejects.toThrow();
        });
    });

    describe("update status by id", () => {

        let todo;

        beforeAll(async () => {
            todo = await Todo.create({ task: "anything" });
        });

        test("should update status with valid id", async () => {
            const expectedStatus = true;
            const { _id } = todo;

            const updatedTodo = await todoService.updateStatusById(expectedStatus, _id);

            expect(updatedTodo.status).toBeTruthy();
        });

        test("should throw with invalid status", () => {
            const { _id } = todo;

            expect(async () => await todoService.updateStatusById(undefined, _id)).rejects.toThrow();
            expect(async () => await todoService.updateStatusById(null, _id)).rejects.toThrow();
            expect(async () => await todoService.updateStatusById("", _id)).rejects.toThrow();
        });
    });

    describe("delete by id", () => {

        let todo;

        beforeAll(async () => {
            todo = await Todo.create({ task: "remove" });
        });

        test("should delete to-do by id and return null", async () => {
            const { _id } = todo;

            const deletedId = await todoService.deleteById(_id);
            const foundTodo = await Todo.findById(_id);

            expect(deletedId.toString()).toBe(_id.toString());
            expect(foundTodo).toBeNull();
        });

    });

});