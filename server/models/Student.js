import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
    rollNo: { type: String, required: true, unique: true }, // Added roll field
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    grade: { type: String, required: true },
    role: { type: String, default: 'student' } // Added default value
});

const studentModel = mongoose.model('Student', studentSchema);

export { studentModel as Student };