import { app } from "./app";
import Database from './configs/database';
import { DefaultPhotos } from './models';
import { imageDest, imageName } from './utils/common-methods';
import axios from "axios";
import fs from "fs";

const start = async () => {
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

}

const download = async (id: number, url: string) => {
  try {

    if (!fs.existsSync(imageDest(id))) {
      /* Create an empty file where we can save data */
      const file = fs.createWriteStream(imageDest(id));
      const response = await axios({ url, method: "GET", responseType: "stream" });
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
    console.error('exception ', error);
    throw error;
  }
};

const fetchDefaultPhotos = async () => {

  try {
    const { data } = await axios.get('https://dev-pb-apps.s3-eu-west-1.amazonaws.com/collection/CHhASmTpKjaHyAsSaauThRqMMjWanYkQ.json');
    if(Array.isArray(data.entries)){

      const promises = data.entries.map(({ picture, id }: any) => download(id, picture));

      await Promise.all(promises);
      console.log('Download Completed');

    }
  } catch (error) {
    console.error(error);
    throw error;
  }

}

 // establishing the database connection and express app
fetchDefaultPhotos();
start();
