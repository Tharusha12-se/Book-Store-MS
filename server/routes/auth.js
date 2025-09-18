import express, { Router } from 'express'
import { Admin } from '../models/Admin.js'
import { Student } from '../models/Student.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

const router = express.Router()

router.post('/login', async (req, res) => {
    
    try {
        const {username, password, role} = req.body;
    if(role === 'admin'){

        const admin = await Admin.findOne({username})
        if(!admin){
            return res.json({message: "Admin not registered"})
        }

        const validPassword = await bcrypt.compare(password, admin.password)
        if(!validPassword){
            return res.json({message: "Wrong password"})
        }
        const token = jwt.sign({username: admin.username, role: 'admin'}, process.env.Admin_Key)
        res.cookie('token', token, {httpOnly : true, secure: true})
        return res.json({login: true, role: 'admin'})

    }else if(role === 'student'){

    }else {

    }
}catch (err){
    console.log(err)
}
})

//reset passsword
router.post('/reset-password', async (req, res) => {
    try {
        const { username, newPassword } = req.body;

        // Find the admin
        const admin = await Admin.findOne({ username });
        if (!admin) {
            return res.status(404).json({ message: "Admin not found" });
        }

        // Hash the new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        
        // Update the password
        admin.password = hashedPassword;
        await admin.save();

        res.json({ message: "Password reset successfully" });

    } catch (error) {
        console.error("Password reset error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

//add student
router.post('/add-student', async (req, res) => {
    try{
    const {role, username, password, grade} = req.body;
    const student = Student.findOne({username})

    if(student){
        return res.json({message: "Student already registered"})
    }
        const hashePassword = await bcrypt.hash(password, 10)
        const newStudent = new Student({
            role: role,
            username,
            password: hashePassword,
            grade
        })
        await newStudent.save()
        return res.json({registered: true})
    
    }catch(err){
        return res.json({message: "Error in student registration"})
    }
})

export {router as AdminRouter}