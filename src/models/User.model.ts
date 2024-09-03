import mongoose, { Document, Schema } from 'mongoose';

interface IUser extends Document {
  username: string;
  password: string;
  role: string;
  images: {
    front: string | null;
    left: string | null;
    right: string | null;
    up: string | null;
  };
}

const userSchema = new Schema<IUser>({
  username: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, required: true },
  images: {
    front: { type: String, default: null },
    left: { type: String, default: null },
    right: { type: String, default: null },
    up: { type: String, default: null }
  }
});

const User = mongoose.model<IUser>('User', userSchema);
export default User;
