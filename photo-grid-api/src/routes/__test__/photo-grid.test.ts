import request from "supertest";
import { app } from "../../app";

it("has a route handler listening to /api/grid/photo for post request", async () => {
  const response = await request(app).post("/api/grid/photo").send({});
  expect(response.status).not.toEqual(404);
});

it("fails when request body is empty", async () => {
  await request(app).post("/api/grid/photo").send({}).expect(400);
});

it("fails when request body only contains picture URL", async () => {
  await request(app)
    .post("/api/grid/photo")
    .send({ picture: "https://abcd.com" })
    .expect(400);
});

it("fails when request body only picture ID", async () => {
  await request(app)
    .post("/api/grid/photo")
    .send({ id: 2323232 })
    .expect(400);
});

it("fails when picture ID has string value", async () => {
    await request(app)
      .post("/api/grid/photo")
      .send({ id: '2323232' })
      .expect(400);
});

it("inserts a grid photo when picture URL and ID provided correctly", async () => {
    await request(app)
      .post("/api/grid/photo")
      .send({ picture: "https://abcd.com", id: 2323232 })
      .expect(200);
});
