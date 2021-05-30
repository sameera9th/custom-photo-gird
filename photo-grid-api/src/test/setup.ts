import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import { DefaultPhotos } from "../models";
import jwt from "jsonwebtoken";

declare global {
  namespace NodeJS {
    interface Global {
      signin(): string;
    }
  }
}

let mongo: any;
beforeAll(async () => {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
  process.env.API_SECRECT = "12dsds27328s2!@344sdffg";

  mongo = new MongoMemoryServer();
  const mongoUri = await mongo.getUri();

  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

beforeEach(async () => {
  const collections = await mongoose.connection.db.collections();

  for (let collection of collections) {
    await collection.deleteMany({});
  }
  await DefaultPhotos.insertMany([
    {
      id: 204900011,
      picture: "204900011.jpeg",
    },
    {
      id: 204900024,
      picture: "204900024.jpeg",
    },
    {
      id: 204900013,
      picture: "204900013.jpeg",
    },
    {
      id: 204900035,
      picture: "204900035.jpeg",
    },
    {
      id: 204900001,
      picture: "204900001.jpeg",
    },
    {
      id: 204900020,
      picture: "204900020.jpeg",
    },
    {
      id: 204900019,
      picture: "204900019.jpeg",
    },
    {
      id: 204900034,
      picture: "204900034.jpeg",
    },
    {
      id: 204900028,
      picture: "204900028.jpeg",
    },
    {
      id: 204900015,
      picture: "204900015.jpeg",
    },
    {
      id: 204900037,
      picture: "204900037.jpeg",
    },
    {
      id: 204900022,
      picture: "204900022.jpeg",
    },
    {
      id: 204900009,
      picture: "204900009.jpeg",
    },
    {
      id: 204900004,
      picture: "204900004.jpeg",
    },
    {
      id: 204900002,
      picture: "204900002.jpeg",
    },
    {
      id: 204900017,
      picture: "204900017.jpeg",
    },
    {
      id: 204900008,
      picture: "204900008.jpeg",
    },
    {
      id: 204900023,
      picture: "204900023.jpeg",
    },
    {
      id: 204900021,
      picture: "204900021.jpeg",
    },
    {
      id: 204900006,
      picture: "204900006.jpeg",
    },
    {
      id: 204900027,
      picture: "204900027.jpeg",
    },
    {
      id: 204900030,
      picture: "204900030.jpeg",
    },
    {
      id: 204900005,
      picture: "204900005.jpeg",
    },
    {
      id: 204900032,
      picture: "204900032.jpeg",
    },
    {
      id: 204900018,
      picture: "204900018.jpeg",
    },
    {
      id: 204900012,
      picture: "204900012.jpeg",
    },
    {
      id: 204900016,
      picture: "204900016.jpeg",
    },
    {
      id: 204900010,
      picture: "204900010.jpeg",
    },
    {
      id: 204900014,
      picture: "204900014.jpeg",
    },
    {
      id: 204900036,
      picture: "204900036.jpeg",
    },
    {
      id: 204900033,
      picture: "204900033.jpeg",
    },
    {
      id: 204900029,
      picture: "204900029.jpeg",
    },
    {
      id: 204900031,
      picture: "204900031.jpeg",
    },
    {
      id: 204900025,
      picture: "204900025.jpeg",
    },
    {
      id: 204900007,
      picture: "204900007.jpeg",
    },
    {
      id: 204900026,
      picture: "204900026.jpeg",
    },
    {
      id: 204900003,
      picture: "204900003.jpeg",
    },
  ]);
});

afterAll(async () => {
  await mongo.stop();
  await mongoose.connection.close();
});


global.signin = () => {

  // Build a JWT payload.  { id, email }
  const userJwt = jwt.sign(
    {
      id: new mongoose.Types.ObjectId().toHexString(),
      email: 'test@test.com',
    },
    process.env.API_SECRECT!
  );

  // return a string thats the cookie with the encoded data
  return userJwt;
};
