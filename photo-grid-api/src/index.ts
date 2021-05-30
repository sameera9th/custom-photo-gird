import { app } from "./app";
import Database from "./configs/database";
import { DefaultPhotos } from "./models";
import { imageDest, imageName } from "./utils/common-methods";
import axios from "axios";
import fs from "fs";

const start = async () => {
  if (!process.env.API_SECRECT) {
    throw new Error("API_SECRECT env must be defined");
  }
  if (!process.env.MAX_PHOTOS_SELECT_PER_ALBUM) {
    throw new Error("MAX_PHOTOS_SELECT_PER_ALBUM env must be defined");
  }

  if (!process.env.IMAGE_SOURCE) {
    throw new Error("IMAGE_SOURCE env must be defined");
  }

  new Database().connection();
  app.listen(3001, () => {
    console.log(`Photo-grid service is listening on port 3001!`);
  });
};

const insertDefaultImage = async (id: number, picture: string) => {
  try {
    await DefaultPhotos.build({ id, picture }).save();
  } catch (error) {
    console.error(error);
  }
};

const download = async (id: number, url: string) => {
  try {
    if (!fs.existsSync(imageDest(id))) {
      /* Create an empty file where we can save data */
      const file = fs.createWriteStream(imageDest(id));
      const response = await axios({
        url,
        method: "GET",
        responseType: "stream",
      });
      response.data.pipe(file);

      await new Promise((resolve: any, reject: any) => {
        file.on("finish", async () => {
          await insertDefaultImage(id, imageName(id));
          resolve();
        });
        file.on("error", async (error: any) => {
          reject(error);
        });
      }).catch((error) => {
        throw error;
      });
    }
  } catch (error) {
    console.error("exception ", error);
    throw error;
  }
};

const fetchDefaultPhotos = async () => {
  try {
    const { data } = await axios.get(process.env.IMAGE_SOURCE!);
    if (Array.isArray(data.entries)) {
      const promises = data.entries.map(({ picture, id }: any) =>
        download(id, picture)
      );

      await Promise.all(promises);
      console.log("Download Completed");
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

fetchDefaultPhotos(); // downloading the images from the external API
start(); // establishing the database and express application
