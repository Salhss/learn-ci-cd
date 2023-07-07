const mongoose = require("mongoose");
const supertest = require("supertest");
const { app, PORT } = require("../app");
const Todo = require("../models/Todo");

let server;
let request;

beforeAll(async () => {
  // -- CONNECT MONGODB --
  await mongoose.connect(process.env.DB_NAME_TEST, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  console.log("Mongoose berhasil terhubung ke MongoDB");

  // Menyiapkan server untuk pengujian
  server = app.listen(PORT);
  request = supertest(server);

  const todo1 = await Todo.create({
    activity: "Makan Malam",
    status: "Pending",
    date: "Rabu",
    description: "Makan malam bersama keluarga",
  });
});

afterAll(async () => {
  // Menutup koneksi Mongoose
  await Todo.deleteMany();
  await mongoose.connection.close();

  // Menutup server pengujian
  await server?.close();
});

describe("Success Process", function () {
  it("create new todo", async () => {
    let newTodo = {
      activity: "Cuci Piring",
      status: "Pending",
      date: "Selasa",
      description: "Cuci piring kotor",
    };

    const response = await request.post("/todo").send(newTodo);
    expect(response.status).toBe(201);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("_id");
    expect(response.body).toHaveProperty("activity", "Cuci Piring");
    expect(response.body).toHaveProperty("status", "Pending");
    expect(response.body).toHaveProperty("date", "Selasa");
    expect(response.body).toHaveProperty("description", "Cuci piring kotor");
  });

  it("return error when input empty", async () => {
    let newTodo = {
      status: "Pending",
      date: "Selasa",
      description: "Cuci piring kotor",
    };

    const response = await request.post("/todo").send(newTodo);
    expect(response.status).toBe(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toBe("do not empty inputs");
  });
});
