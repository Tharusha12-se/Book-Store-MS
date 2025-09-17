import bcrypt from 'bcrypt';
import { Admin } from './models/Admin.js';
import './db.js';

const createAdmin = async () => {
  try {
    const username = "admin";
    const password = "admin123"; // Set your desired password here
    
    // Check if admin exists
    const existingAdmin = await Admin.findOne({ username });
    if (existingAdmin) {
      console.log("Admin already exists. Updating password...");
      existingAdmin.password = await bcrypt.hash(password, 10);
      await existingAdmin.save();
      console.log("Password updated!");
    } else {
      // Create new admin
      const hashedPassword = await bcrypt.hash(password, 10);
      const newAdmin = new Admin({ username, password: hashedPassword });
      await newAdmin.save();
      console.log("Admin created!");
    }
    
    console.log("Username:", username);
    console.log("Password:", password);
    
  } catch (error) {
    console.error("Error:", error);
  } finally {
    process.exit();
  }
};

createAdmin();