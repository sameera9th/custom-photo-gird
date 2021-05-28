import mongoose, { Schema } from 'mongoose';

// An interface that describes the properties
// that are requried to create a new PhotoGrid
export interface PhotoGridAttrs {
  _id?: string;
  id: number;
  userId?: string;
  order: number;
  picture: string;
}

// An interface that describes the properties
// that a PhotoGrid Model has
interface PhotoGridModel extends mongoose.Model<PhotoGridDoc> {
  build(attrs: PhotoGridAttrs): PhotoGridDoc;
}

// An interface that describes the properties
// that a PhotoGrid Document has
interface PhotoGridDoc extends mongoose.Document {
    id: number;
    order: number;
    userId?: string;
    picture: string;
}

const photoGridSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      required: true
    },
    userId: {
      type: Schema.Types.ObjectId,
      required: true
    },
    order: {
      type: Number,
      required: true
    },
    picture: {
      type: String,
      required: true
    }
  },
  {
    toJSON: {
      transform(doc, ret) {
        delete ret.__v;
      }
    }
  }
);

photoGridSchema.index({ userId: 1 });

// creating a static method call build which we can use as a validator before inserting a record into the database
photoGridSchema.statics.build = (attrs: PhotoGridAttrs) => {
  return new PhotoGrid(attrs);
};

// setting up the modal
const PhotoGrid = mongoose.model<PhotoGridDoc, PhotoGridModel>('photoGrid', photoGridSchema);

export { PhotoGrid };
