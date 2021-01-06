import { Document, Model, model, Schema } from "mongoose";

interface IUserDocument extends Document {
  title: string;
  author: string;
  issn: string;
  created: Date;
}

const userSchema = new Schema<IUserDocument>(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    issn: { type: String, required: true },
    created: { type: Date, default: Date.now },
  },
  { strict: true }
).index(
  { title: 1 },
); 

userSchema.set("toJSON", {
  transform: function(
    _doc: any,
    ret: { created: { getTime: () => any }; __v: any; _id: any; password: any },
    _options: any
  ) {
    ret.created = ret.created.getTime();
    ret['id'] = ret._id
    delete ret.__v;
    delete ret._id;
  },
});

export interface IUserModel extends Model<IUserDocument> {
  // collection/docouments level operations (fetch one or many, update, save back to db)
}
export const BookModel: IUserModel = model<IUserDocument, IUserModel>("user", userSchema);
export default BookModel;
