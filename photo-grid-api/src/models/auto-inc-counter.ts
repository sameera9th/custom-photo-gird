import mongoose from 'mongoose';

// An interface that describes the properties
// that are requried to create a new Counter
interface CounterAttrs {
    _id: string;
    sequence_value: number;
}

// An interface that describes the properties
// that a Counter Model has
interface CounterModel extends mongoose.Model<CounterDoc> {
  build(attrs: CounterAttrs): CounterDoc;
}

// An interface that describes the properties
// that a Counter Document has
interface CounterDoc extends mongoose.Document {
    _id: string;
    sequence_value: number;
}

const counterSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      required: true
    },
    sequence_value: {
      type: Number,
      required: true
    }
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      }
    }
  }
);

counterSchema.statics.build = (attrs: CounterAttrs) => {
  return new Counter(attrs);
};

const Counter = mongoose.model<CounterDoc, CounterModel>('counter', counterSchema);

export { Counter };
