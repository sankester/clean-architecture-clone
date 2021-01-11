/* eslint-disable @typescript-eslint/no-unused-vars */
import { Document, Schema, Model, model } from 'mongoose';

export interface IAccountDocument extends Document {
  name: string;
  email: string;
  password: string;
}

const accountSchema = new Schema<IAccountDocument>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { strict: true, timestamps: true }
).index({ email: 1 });

accountSchema.set('toJSON', {
  transform: function (_doc: any, ret: any, _options: any) {
    ret['id'] = ret._id;
    delete ret.__v;
    delete ret._id;
    delete ret.createdAt;
    delete ret.updatedAt;
  },
});

export type IAccountModel = Model<IAccountDocument>;
export const AccountModel: IAccountModel = model<
  IAccountDocument,
  IAccountModel
>('account', accountSchema);
export default AccountModel;
