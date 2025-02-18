import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';

// Connect to MongoDB
const mongoURI = 'mongodb://127.0.0.1:27017/blogs';
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Define Blog schema and model
const blogSchema = new mongoose.Schema({
    mail: { type: String, required: true },
    heading: { type: String, required: true },
    content: { type: String, required: true },
    imageURL: { type: String, required: true },
    date: { type: Date, default: Date.now }
});
const Blog = mongoose.model('Blog', blogSchema);

// Define User schema and model
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});
const User = mongoose.model('User', userSchema);

// Define Category schema and model
const categorySchema = new mongoose.Schema({
    cat_Name: { type: String, required: true },
    entries: { type: Number, required: true }
});
const Category = mongoose.model('Category', categorySchema);

// Route to add a new blog
app.post('/api/blogs', async (req, res) => {
    const { mail, heading, content, imageURL } = req.body;
    try {
        const newBlog = new Blog({ mail, heading, content, imageURL });
        await newBlog.save();
        res.json(newBlog);
    } catch (error) {
        res.status(500).json({ error: 'Failed to add blog' });
    }
});

// Route to add a new user
app.post('/api/signup', async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists' });
        }
        const newUser = new User({ name, email, password });
        await newUser.save();
        res.json(newUser);
    } catch (error) {
        res.status(500).json({ error: 'Failed to sign up' });
    }
});

// Route to check the sign-in process
app.post('/api/signin', async (req, res) => {
    const { email, password } = req.body;
    try {
        const existingUser = await User.findOne({ email, password });
        if (existingUser) {
            res.json({ name: existingUser.name, email: existingUser.email });
        } else {
            res.status(401).json({ error: 'Invalid credentials' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to sign in' });
    }
});

// Route to get blogs filtered by email
app.get('/api/blogs', async (req, res) => {
    const { email } = req.query;
    try {
        const query = email ? { mail: email } : {};
        const blogs = await Blog.find(query);
        res.json(blogs);
    } catch (error) {
        res.status(500).json({ error: 'Failed to get blogs' });
    }
});

// Start the server
app.listen(5000, () => {
    console.log('Server is running on port 5000');
});

export default app;
