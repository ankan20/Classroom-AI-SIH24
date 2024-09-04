import mongoose, { Document, Schema } from 'mongoose';

interface ITeacher extends Document {
  username: string;
  password: string;
  role: 'teacher';
  students: mongoose.Schema.Types.ObjectId[];
}

const teacherSchema = new Schema<ITeacher>({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true, enum: ['teacher'] },
  students: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Student' }]
});

const Teacher = mongoose.models.Teacher || mongoose.model<ITeacher>('Teacher', teacherSchema);

export default Teacher;