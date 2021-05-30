import mongoose from "mongoose";
import { Password } from "../services/password";

// An interface that describes the properties
// that are requried to create a new User
interface UserAttrs {
  email: string;
  password: string;
  selectedPhotos?: [
    {
      id: number;
      picture: string;
    }
  ];
}

// An interface that describes the properties
// that are requried to select a photo

interface SelectPhotoAttrs {
  id: number;
  picture: string;
}

// An interface that describes the properties
// that a User Model has
interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
  findLastSelectedPhoto(userId: string, photoId: number): UserDoc;
  selectPhoto(userId: string, attrs: SelectPhotoAttrs): UserDoc;
  deSelectPhoto(userId: string, photoId: number): UserDoc;
  getAllSelectedPhotos(userId: string): UserDoc;
  orderSelectedPhotos(
    userId: string,
    orderedList: Array<SelectPhotoAttrs>
  ): UserDoc;
  userHasExceededMaxSelection(userId: string): Boolean;
}

// An interface that describes the properties
// that a User Document has
interface UserDoc extends mongoose.Document {
  email: string;
  password: string;
  selectedPhotos: [
    {
      id: number;
      picture: string;
    }
  ];
}

// An interface that describes the properties
// that a User Selected Photo Document has
interface UserSelectedPhotoDoc extends UserDoc {
  selectedPhotos: [
    {
      id: number;
      picture: string;
    }
  ];
}

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    selectedPhotos: [
      {
        id: {
          type: Number,
        },
        picture: {
          type: String,
        },
      },
    ],
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.password;
        delete ret.__v;
      },
    },
  }
);

userSchema.pre("save", async function (done) {
  if (this.isModified("password")) {
    const hashed = await Password.toHash(this.get("password"));
    this.set("password", hashed);
  }
  done();
});

userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
};

userSchema.statics.findLastSelectedPhoto = async (
  userId: string,
  photoId: number
) => {
  try {
    return await User.find(
      { _id: userId, "selectedPhotos.id": photoId },
      { "selectedPhotos.$": true }
    );
  } catch (error) {
    throw error;
  }
};

userSchema.statics.userHasExceededMaxSelection = async (userId: string) => {
  const isMaxSelected = await User.findOne({
    _id: userId,
    $where: `this.selectedPhotos.length >= ${process.env.MAX_PHOTOS_SELECT_PER_ALBUM}`,
  });
  return isMaxSelected ? true : false;
};

userSchema.statics.selectPhoto = async (
  userId: string,
  attrs: SelectPhotoAttrs
) => {
  try {
    const user = await User.findOneAndUpdate(
      { _id: userId, "selectedPhotos.id": { $ne: attrs.id } },
      { $push: { selectedPhotos: attrs } },
      { new: true }
    );

    const selectedPhotos = user
      ? user.selectedPhotos[user.selectedPhotos.length - 1]
      : null;
    return selectedPhotos;
  } catch (error) {
    throw error;
  }
};

userSchema.statics.getAllSelectedPhotos = async (userId: string) => {
  try {
    const user = await User.findOne({ _id: userId });

    return user ? user.selectedPhotos : null;
  } catch (error) {
    throw error;
  }
};

userSchema.statics.deSelectPhoto = async (userId: string, photoId: number) => {
  try {
    const user = await User.findOneAndUpdate(
      { _id: userId, "selectedPhotos.id": photoId },
      { $pull: { selectedPhotos: { id: photoId } } },
      { new: true }
    );

    return user ? user.selectedPhotos : null;
  } catch (error) {
    throw error;
  }
};

userSchema.statics.orderSelectedPhotos = async (
  userId: string,
  orderedList: Array<SelectPhotoAttrs>
) => {
  try {
    const user = await User.findOneAndUpdate(
      { _id: userId },
      {
        $set: {
          selectedPhotos: orderedList,
        },
      },
      { new: true }
    );

    return user ? user.selectedPhotos : null;
  } catch (error) {
    throw error;
  }
};

const User = mongoose.model<UserDoc, UserModel>("User", userSchema);

export { User, UserDoc };
