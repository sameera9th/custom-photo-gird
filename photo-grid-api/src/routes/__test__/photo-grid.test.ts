import request from "supertest";
import { app } from "../../app";

it("has a GET route handler listening to /api/grid/photo/default to get default images", async () => {
  const response = await request(app).get("/api/grid/photo/default").send({});
  expect(response.status).not.toEqual(404);
});

it("There should be total of 37 default images return from the database", async () => {
  const response = await request(app).get("/api/grid/photo/default").send({});
  expect(response.body.data.length).toEqual(37);
});

it("has a POST route handler listening to /api/grid/photo for select a photo", async () => {
  const response = await request(app).post("/api/grid/photo").send({});
  expect(response.status).not.toEqual(404);
});

it("Select a photo route can only be accessed if the user is signed in", async () => {
  await request(app).post("/api/grid/photo").send({}).expect(401);
});

it("Select a photo will return a status other than 401 if the user is signed in", async () => {
  const response = await request(app)
    .post("/api/grid/photo")
    .set("authorization", global.signin())
    .send({});

  expect(response.status).not.toEqual(401);
});

it("Select a photo will return an error if an invalid paramters are provided", async () => {
  await request(app)
    .post("/api/grid/photo")
    .set("authorization", global.signin())
    .send({
      id: "",
      picture: 10,
    })
    .expect(400);

  await request(app)
    .post("/api/grid/photo")
    .set("authorization", global.signin())
    .send({
      id: "",
    })
    .expect(400);
});

it("Select a photo will return a success if an valid paramters are provided", async () => {
  const response = await request(app)
    .post("/api/user/signup")
    .send({
      email: "test@test.com",
      password: "password",
    })
    .expect(200);

  await request(app)
    .post("/api/grid/photo")
    .set("authorization", response.body.data.token)
    .send({
      id: "204900010",
      picture: "204900010.jpeg",
    })
    .expect(200);
});

it("has a GET route handler listening to /api/grid/photo for retrieve selected photos", async () => {
  const response = await request(app).get("/api/grid/photo").send({});
  expect(response.status).not.toEqual(404);
});

it("has a GET route handler listening to /api/grid/photo for retrieve selected photos", async () => {
  const response = await request(app).get("/api/grid/photo").send({});
  expect(response.status).not.toEqual(404);
});

it("Retrieve selected photos route can only be accessed if the user is signed in", async () => {
  await request(app).post("/api/grid/photo").send({}).expect(401);
});

it("Retrieve selected photos return a success if an user is signed in", async () => {
  const response = await request(app)
    .post("/api/user/signup")
    .send({
      email: "test@test.com",
      password: "password",
    })
    .expect(200);

  await request(app)
    .get("/api/grid/photo")
    .set("authorization", response.body.data.token)
    .expect(200);
});

it("has a DELETE route handler listening to /api/grid/photo for retrieve selected photos", async () => {
  const response = await request(app)
    .delete("/api/grid/photo/1212121")
    .send({});
  expect(response.status).not.toEqual(404);
});

it("Deselect image route can only be accessed if the user is signed in", async () => {
  await request(app).delete("/api/grid/photo/1212121").expect(401);
});

it("Deselect will return success response for valid image id and signed in users", async () => {
  const user = await request(app)
    .post("/api/user/signup")
    .send({
      email: "test@test.com",
      password: "password",
    })
    .expect(200);

  const selectedImage = await request(app)
    .post("/api/grid/photo")
    .set("authorization", user.body.data.token)
    .send({
      id: "204900010",
      picture: "204900010.jpeg",
    })
    .expect(200);
  const response = await request(app)
    .delete("/api/grid/photo/" + selectedImage.body.data.id)
    .set("authorization", user.body.data.token);
  expect(response.status).toEqual(200);
});

it("has a POST route handler listening to /api/grid/photo/order for order selected photos", async () => {
  const response = await request(app)
    .post("/api/grid/photo/order")
    .send({});
  expect(response.status).not.toEqual(404);
});

it("Reorder selected images route can only be accessed if the user is signed in", async () => {
  await request(app).post("/api/grid/photo/order").expect(401);
});

it("Reorder selected images will return an error if an invalid paramters are provided", async () => {
  await request(app)
    .post("/api/grid/photo/order")
    .set("authorization", global.signin())
    .send({
      selectedPhotos: [
        {
          id: "",
          picture: 10,
        }
      ]
    })
    .expect(400);

  await request(app)
    .post("/api/grid/photo/order")
    .set("authorization", global.signin())
    .send({
      selectedPhotos: [
        {
          id: "",
        }
      ]
    })
    .expect(400);
});

it("Reorder selected images will return an success if a valid paramters are provided", async () => {
  const user = await request(app)
    .post("/api/user/signup")
    .send({
      email: "test@test.com",
      password: "password",
    })
    .expect(200);

  const selectedPhotoOne = await request(app)
    .post("/api/grid/photo")
    .set("authorization", user.body.data.token)
    .send({
      id: "204900010",
      picture: "204900010.jpeg",
    })
    .expect(200);
    const selectedPhotoTwo = await request(app)
    .post("/api/grid/photo")
    .set("authorization", user.body.data.token)
    .send({
      id: "204900011",
      picture: "204900011.jpeg",
    })
    .expect(200);

  await request(app)
    .post("/api/grid/photo/order")
    .set("authorization", user.body.data.token)
    .send({
      selectedPhotos: [selectedPhotoTwo.body.data, selectedPhotoOne.body.data]
    })
    .expect(200);
});