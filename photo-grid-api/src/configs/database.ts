import mongoose from "mongoose";

export default class Database {

  public async connection() {
    await mongoose.connect("mongodb://mongo:27017/photo", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    console.log("Connected to Mongodb");
  }

  public static debug(debug: any) {
    console.error(
      "Error occurred while connecting to the leafwire database ",
      debug
    );
    mongoose.set("debug", debug);
  }
  
}
