// import mongoose, { Document, Schema } from 'mongoose';

// interface IUser extends Document {
//   username: string;
//   password: string;
//   role: string;
//   images: {
//     front: string | null;
//     left: string | null;
//     right: string | null;
//     up: string | null;
//   };
// }

// const userSchema = new Schema<IUser>({
//   username: { type: String, required: true },
//   password: { type: String, required: true },
//   role: { type: String, required: true },
//   images: {
//     front: { type: String, default: null },
//     left: { type: String, default: null },
//     right: { type: String, default: null },
//     up: { type: String, default: null }
//   }
// });

// const User = mongoose.model<IUser>('User', userSchema);
// export default User;


import mongoose, { Document, Schema } from 'mongoose';

interface IStudent extends Document {
  username: string;
  password: string;
  role: 'student';
  teachers: mongoose.Schema.Types.ObjectId[];
  images: {
    front: string;
    left: string;
    right: string;
    up: string;
  };
}

const studentSchema = new Schema<IStudent>({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true, enum: ['student'] },
  teachers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Teacher' }],
  images: {
    front: { type: String, default: null },
    left: { type: String, default: null },
    right: { type: String, default: null },
    up: { type: String, default: null }
  }
});

const Student =mongoose.models.Student || mongoose.model<IStudent>('Student', studentSchema);
export default Student;
