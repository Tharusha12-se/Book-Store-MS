import express from 'express'
import { Admin } from '../models/Admin.js'
import { Student } from '../models/Student.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

const router = express.Router()

// Admin login route
router.post('/login', async (req, res) => {
    try {
        const {username, password, role} = req.body;
        
        if(role === 'admin'){
            const admin = await Admin.findOne({username})
            if(!admin){
                return res.status(404).json({message: "Admin not registered"})
            }

            const validPassword = await bcrypt.compare(password, admin.password)
            if(!validPassword){
                return res.status(401).json({message: "Wrong password"})
            }
            
            const token = jwt.sign({username: admin.username, role: 'admin'}, process.env.Admin_Key)
            res.cookie('token', token, {
                httpOnly: true, 
                secure: process.env.NODE_ENV === 'production',
                maxAge: 24 * 60 * 60 * 1000
            })
            return res.json({login: true, role: 'admin'})

        } else if(role === 'student') {
            // Student login logic here
            const student = await Student.findOne({username})
            if(!student){
                return res.status(404).json({message: "Student not registered"})
            }

            const validPassword = await bcrypt.compare(password, student.password)
            if(!validPassword){
                return res.status(401).json({message: "Wrong password"})
            }
            
            const token = jwt.sign({username: student.username, role: 'student'}, process.env.Student_Key)
            res.cookie('token', token, {
                httpOnly: true, 
                secure: process.env.NODE_ENV === 'production',
                maxAge: 24 * 60 * 60 * 1000
            })
            return res.json({login: true, role: 'student'})
            
        } else {
            return res.status(400).json({message: "Invalid role"})
        }
    } catch (err) {
        console.error("Login error:", err);
        return res.status(500).json({message: "Internal server error"});
    }
})

// Reset password route
router.post('/reset-password', async (req, res) => {
    try {
        const { username, newPassword, role } = req.body;

        if (role === 'admin') {
            const admin = await Admin.findOne({ username });
            if (!admin) {
                return res.status(404).json({ message: "Admin not found" });
            }

            const hashedPassword = await bcrypt.hash(newPassword, 10);
            admin.password = hashedPassword;
            await admin.save();
            return res.json({ message: "Admin password reset successfully" });

        } else if (role === 'student') {
            const student = await Student.findOne({ username });
            if (!student) {
                return res.status(404).json({ message: "Student not found" });
            }

            const hashedPassword = await bcrypt.hash(newPassword, 10);
            student.password = hashedPassword;
            await student.save();
            return res.json({ message: "Student password reset successfully" });

        } else {
            return res.status(400).json({ message: "Invalid role" });
        }

    } catch (error) {
        console.error("Password reset error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
});

// Add student route - FIXED THE TYPO
router.post('/add-student', async (req, res) => {
    try {
        const {roll, username, password, grade, role} = req.body;
        
        // Check if student already exists
        const existingStudent = await Student.findOne({username});
        if(existingStudent){
            return res.status(400).json({message: "Student already registered"});
        }
        
        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);
        
        // Create new student
        const newStudent = new Student({
            role: role || 'student',
            username,
            password: hashedPassword,
            grade
        });
        
        await newStudent.save();
        return res.json({registered: true, message: "Student registered successfully"});
        
    } catch (err) {
        console.error("Student registration error:", err);
        return res.status(500).json({message: "Error in student registration"});
    }
});

export { router as AdminRouter }