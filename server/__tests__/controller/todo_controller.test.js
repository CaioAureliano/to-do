import "regenerator-runtime/runtime";
import request from "supertest";
import app from "../../src/index";
import { Todo } from "../../src/model/todo";

import { TODO_PATH } from "../../src/routes";

describe(`GET ${TODO_PATH}`, () => {

    const tasksToCreateMock = [
        { task: "eat" },
        { task: "sleep" },
        { task: "learn" }
    ];

    beforeEach(async () => {
        await Todo.insertMany(tasksToCreateMock);
    });

    test("should response a list with to-do's", async () => {
        const response = await request(app).get(TODO_PATH);

        expect(response.body.results.length).toBe(3);
        expect(response.status).toBe(200);  
    });

});

describe(`POST ${TODO_PATH}`, () => {
    test("should create new to-do with valid body and response created status code", async () => {
        const response = await request(app)
                .post(TODO_PATH)
                .send({ task: "test api" })
                .set("Accept", "application/json");

        
        expect(response.headers["content-type"]).toMatch(/json/);
        expect(response.headers.location).toContain("/todo/");
        expect(response.body).toHaveProperty("_id");
        expect(response.status).toBe(201);
    });

    test("should post invalid body and response internal error", async () => {
        const response = await request(app)
                .post(TODO_PATH)
                .send({ task: "" });

        expect(response.status).toBe(500);
    });

    test("should post empty body and response bad request status code", async () => {
        const response = await request(app)
                .post(TODO_PATH)
                .send({});

        expect(response.headers.location).not.toBeDefined();
        expect(response.status).toBe(400);
    });
});

describe(`GET ${TODO_PATH}/:id`, () => {

    let todoInsertedId;
    const newTaskToCreate = "new task";

    beforeAll(async () => {
        const { _id } = await Todo.create({ task: newTaskToCreate });
        todoInsertedId = _id;
    });

    test("should be GET with valid ID and response body with to-do", async () => {
        const response = await request(app).get(`${TODO_PATH}/${todoInsertedId}`);

        expect(response.body.task).toBe(newTaskToCreate);
        expect(response.body._id).toBe(todoInsertedId.toString());
        expect(response.status).toBe(200);
    });

    test("shoulb be GET with invalid ID and response with not found status", async () => {
        const response = await request(app).get(`${TODO_PATH}/abc1234def`);

        expect(response.status).toBe(404);
    });
});

describe(`PATCH ${TODO_PATH}/:id`, () => {

    let insertedId;

    beforeAll(async () => {
        const { _id } = await Todo.create({ task: "burguer" });
        insertedId = _id;
    });

    test("should PATCH with valid body and response ok status", async () => {
        const response = await request(app)
                .patch(`${TODO_PATH}/${insertedId}`)
                .send({ task: "lunch" });

        expect(response.headers.location).toEqual(`/todo/${insertedId}`);
        expect(response.body.id).toBe(insertedId.toString());
        expect(response.status).toBe(200);
    });

    test("should PATCH with valid body and invalid ID response not found", async () => {
        const response = await request(app)
                .patch(`${TODO_PATH}/1234abc567`)
                .send({ task: "salad" });

        expect(response.headers.location).not.toBeDefined();
        expect(response.status).toBe(404);
    });
});

describe(`PATCH ${TODO_PATH}/status/:id`, () => {
    
    let insertedId;

    beforeAll(async () => {
        const { _id } = await Todo.create({ task: "learn JavaScript" });
        insertedId = _id;
    });

    test("should PATCH with status body and exists ID response ok status", async () => {
        const response = await request(app)
                .patch(`${TODO_PATH}/${insertedId}/status`)
                .send({ status: true });

        expect(response.headers.location).toEqual(`/todo/${insertedId}`);
        expect(response.body.id).toBe(insertedId.toString());
        expect(response.status).toBe(200);
    });

    test("should PATCH with status body and invalid ID response not found", async () => {
        const response = await request(app)
                .patch(`${TODO_PATH}/123abcd456/status`)
                .send({ status: true });

        expect(response.headers.location).not.toBeDefined();
        expect(response.status).toBe(404);
    });
});

describe(`DELETE ${TODO_PATH}/:id`, () => {

    let insertedId;

    beforeAll(async () => {
        const { _id } = await Todo.create({ task: "run" });
        insertedId = _id;
    });

    test("should DELETE with valid ID and response ok status", async () => {
        const response = await request(app).delete(`${TODO_PATH}/${insertedId}`);        

        expect(response.body.id).toBe(insertedId.toString());
        expect(response.status).toBe(200);
    });
    
    test("should DELETE with invalid ID and response not found", async () => {
        const response = await request(app).delete(`${TODO_PATH}/1234abc`);        

        expect(response.body.id).not.toBeDefined();
        expect(response.status).toBe(404);
    });
});