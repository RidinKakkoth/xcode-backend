import User from '../models/userModel.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

// Register new user
export const register = async (req, res) => {
    const { name, email, password } = req.body;
    console.log(name,email,password);
    
    
    try {
        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash the password manually
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
        });

        // Save new user to the database
        await newUser.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error during registration', error });
    }
};

// Login existing user
export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if the user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Compare the entered password with the stored hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Generate JWT token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
console.log(token,"token");

        res.status(200).json({
            token,
            user: { id: user._id, name: user.name, email: user.email },
        });
    } catch (error) {
        res.status(500).json({ message: 'Error during login', error });
    }
};
