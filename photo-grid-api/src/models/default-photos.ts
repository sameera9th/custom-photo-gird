import mongoose from 'mongoose';

// An interface that describes the properties
// that are requried to create a new Default photos
export interface DefaultPhotoAttrs {
  _id?: string;
  id: number;
  picture: string;
}

// An interface that describes the properties
// that a DefaultPhoto Model has
interface DefaultPhotoModel extends mongoose.Model<DefaultPhotoDoc> {
  build(attrs: DefaultPhotoAttrs): DefaultPhotoDoc;
}

// An interface that describes the properties
// that a DefaultPhoto Document has
interface DefaultPhotoDoc extends mongoose.Document {
    id: number;
    picture: string;
}

const defaultPhotoSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      unique: true,
      required: true
    },
    picture: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true,
    toJSON: {
      transform(doc, ret) {
        delete ret.__v;
      }
    }
  }
);

// creating a static method call build which we can use as a validator before inserting a record into the database
defaultPhotoSchema.statics.build = (attrs: DefaultPhotoAttrs) => {
  return new DefaultPhoto(attrs);
};

// setting up the modal
const DefaultPhoto = mongoose.model<DefaultPhotoDoc, DefaultPhotoModel>('defaultphoto', defaultPhotoSchema);

export { DefaultPhoto };
