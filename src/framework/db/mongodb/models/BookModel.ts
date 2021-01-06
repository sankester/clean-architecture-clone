/* eslint-disable @typescript-eslint/no-unused-vars */
import { Document, Model, model, Schema } from 'mongoose';

interface IBookDocument extends Document {
  title: string;
  author: string;
  issn: string;
  created: Date;
}

const userSchema = new Schema<IBookDocument>(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    issn: { type: String, required: true },
    created: { type: Date, default: Date.now },
  },
  { strict: true }
).index({ title: 1 });

userSchema.set('toJSON', {
  transform: function (
    _doc: any,
    ret: { created: { getTime: () => any }; __v: any; _id: any; password: any },
    _options: any
  ) {
    ret.created = ret.created.getTime();
    ret['id'] = ret._id;
    delete ret.__v;
    delete ret._id;
  },
});

export type IBookModel = Model<IBookDocument>;
export const BookModel: IBookModel = model<IBookDocument, IBookModel>(
  'user',
  userSchema
);
export default BookModel;
