import { Schema, model, ObjectId } from "mongoose";

export interface IUser extends Document {
    _id: ObjectId,
    name: string,
    email: string,
    password: string,
    salt: string
  }

const UserSchema = new Schema({
    name: {
        type: String,
        null: false
    },
    email: {
        type: String,
        null: false
    },
    password: {
        type: String,
        null: false
    },
    salt: {
        type: String,
        null: false
    }
},{
    timestamps: true
})

UserSchema.index({ email: 1, name: 1, password: 1, salt: 1 });

export default model<IUser>('users', UserSchema);