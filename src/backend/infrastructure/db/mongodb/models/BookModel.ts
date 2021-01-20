/* eslint-disable @typescript-eslint/no-unused-vars */
import { Document, Model, model, Schema } from 'mongoose';

export interface IBookDocument extends Document {
  title: string;
  author: string;
  issn: string;
}

const bookSchema = new Schema<IBookDocument>(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    issn: { type: String, required: true },
  },
  { strict: true, timestamps: true }
).index({ title: 1 });

bookSchema.set('toJSON', {
  transform: function (_doc: any, ret: any, _options: any) {
    ret['id'] = ret._id;
    delete ret.__v;
    delete ret._id;
    delete ret.createdAt;
    delete ret.updatedAt;
  },
});

export type IBookModel = Model<IBookDocument>;
export const BookModel: IBookModel = model<IBookDocument, IBookModel>(
  'book',
  bookSchema
);
export default BookModel;
