import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';
import { OAuth2Client } from 'google-auth-library';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
import confMail  from './confMail.js';
import { comment } from 'postcss';
dotenv.config();


// Connect to MongoDB
const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/blogs';
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
    date: { type: Date, default: Date.now },
    authorName: { type: String, required: true },
    authorImage: { type: String, required: true },
    likes: { type: Number, required: true },
    views: { type: Number, required: true}
});
const Blog = mongoose.model('Blog', blogSchema);

// Define User schema and model
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profileImage: { type: String, required: false }
});
const User = mongoose.model('User', userSchema);

// Define Category schema and model
const categorySchema = new mongoose.Schema({
    cat_Name: { type: String, required: true },
    entries: { type: Number, required: true }
});
const Category = mongoose.model('Category', categorySchema);

// Define a category schema for comments 
const commentSchema = new mongoose.Schema({
    blogTitle: { type: String, required: true },
    time : { type: Date, default: Date.now },
    authorMail : { type: String, required: true },
    comment : { type: String, required: true },
    comName : { type: String, required: true },
    comImgURL : { type: String, required: true }
});
const Comment = mongoose.model('Comment', commentSchema);

// Define notification schema and model, it contains image of person who liked the blog, name of the person who liked the blog, date and time of the like and email address of person whose article was liked
const notificationSchema = new mongoose.Schema({
    lbImgURL : { type: String, required: true },    // URL of the image of the person who liked the blog
    lbName: { type: String, required: true },      // Name of the person who liked the blog
    date: { type: Date, default: Date.now },
    mail: { type: String, required: true }, // Email address of the person whose article was liked
    nType : { type: String, required: true , default:'like' } // Type of notification
});
const Notification = mongoose.model('Notification', notificationSchema);

// Route to get all notifications by email
app.get('/api/notifications', async (req, res) => {
    const { email } = req.query;
    try {
        const notifications = await Notification.find({ mail: email }).sort({ date: -1 });
        console.log(notifications) ; 
        // Return first five notifications only
        res.json(notifications.slice(0, 5));
    } catch (error) {
        res.status(500).json({ error: 'Failed to get notifications' });
    }
});

// Route to add a new notification (like)
app.post('/api/notifications', async (req, res) => {
    const { lbImgURL, lbName, mail } = req.body;
    try {
        const newNotification = new Notification({ lbImgURL, lbName, mail });
        await newNotification.save();
        res.json({success: true});
    } catch (error) {
        res.status(500).json({ error: 'Failed to add notification' });
    }
});

// Route to add a notification (comment)
app.post('/api/notifications/comment', async (req, res) => {
    const { lbImgURL, lbName, mail } = req.body;
    try {
        const newNotification = new Notification({ lbImgURL, lbName, mail, nType : 'comment' });
        await newNotification.save();
        res.json({success: true});
    } catch (error) {
        res.status(500).json({ error: 'Failed to add notification' });
    }
}); 


// Route to add a new blog
app.post('/api/blogs', async (req, res) => {
    const { mail, heading, content, imageURL, authorName, authorImage, likes, views } = req.body;
    try {
        const newBlog = new Blog({ mail, heading, content, imageURL, authorName, authorImage, likes, views });
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
    // const { email } = req.query;
    try {
        const blogs = await Blog.find({});
        res.json(blogs);
    } catch (error) {
        res.status(500).json({ error: 'Failed to get blogs' });
    }
});

// Route to get blogs of a particular user
app.get('/api/myblogs', async (req, res) => {
    const { email } = req.query;
    try {
        const blogs = await Blog.find({ mail: email });
        res.json(blogs);
    } catch (error) {
        res.status(500).json({ error: 'Failed to get blogs' });
    }
});

// Update likes -------------------------------------
app.post("/blogs/:title/like", async (req, res) => {
    try {
      const { liked } = req.body;
    const blog = await Blog.findOne({ heading: req.params.title });
      if (!blog) return res.status(404).json({ message: "Blog not found" });
  
      blog.likes = liked ? blog.likes + 1 : blog.likes - 1;
      await blog.save();
  
      res.status(200).json({ likes: blog.likes });
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

// Update views -------------------------------------
app.post("/blogs/:title/view", async (req, res) => {
    try {
      const { view } = req.body;
    const blog = await Blog.findOne({ heading: req.params.title });
      if (!blog) return res.status(404).json({ message: "Blog not found" });
  
      blog.views = view;
      await blog.save();
  
      res.status(200).json({ views: blog.views });
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  });


// Route to sign in with google ---------------------------
const CLIENT_ID = process.env.GOOGLE_CLIENT_ID || 'none'; // Replace with your Client ID

const client = new OAuth2Client(CLIENT_ID);
app.post('/api/auth/google', async (req, res) => {
  const { token } = req.body;
  console.log(token); 


  if (!token) {
    return res.status(400).json({ success: false, message: 'Token is missing' });
  }

  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: CLIENT_ID, // Specify the CLIENT_ID of the app that accesses the backend
    });

    const payload = ticket.getPayload();
    const userid = payload['sub'];

    const user = {
      id: userid,
      name: payload['name'],
      email: payload['email'],
      picture: payload['picture'],
    };

    const existingUser = await User.findOne({ email: user.email });
    if (!existingUser) {
      const newUser = new User({ name: user.name, email: user.email, password: 'jackofalltraits', profileImage: user.picture });
      await newUser.save();
    }

    return res.json({ success: true, user });
  } catch (error) {
    console.error('Error verifying Google token:', error);
    return res.status(400).json({ success: false, message: 'Invalid token' });
  }
});


const userMail = process.env.senderMail ; 
const userPassword = process.env.senderPassword ;
// Route to send mail
app.post('/api/sendMail', async (req, res) => {
    console.log("UserMail :" , userMail , "and User Password : " , userPassword) ; 
    const { mail } = req.body;
    if (!mail) {
        return res.status(400).json({ message: 'Email is required' });
    }

    try {
        // Create a transporter object using SMTP transport
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                // user : 'debatingliterary@gmail.com', 
                // pass : 'blqtthulfddxjqme'
                user: userMail,
                pass: userPassword // Use App Password if 2FA is enabled
            }
        });

        // Email options
        const mailOptions = {
            from: '"Magnews Subscription" <your-email@gmail.com>',
            to: mail,
            subject: 'Subscription Confirmation',
            html: confMail
                };

        // Send email
        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: 'Subscribed successfully !!' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ message: 'Failed to send email' });
    }
});

// Post request to add a comment
app.post('/api/addComment', async (req, res) => {
    const { blogTitle, authorMail , comment, comName, comImgURL } = req.body;
    try {
        const newComment = new Comment({ blogTitle, authorMail , comment , comName, comImgURL });
        await newComment.save();
        res.json(newComment);
    } catch (error) {
        res.status(500).json({ error: 'Failed to add comment' });
    }
});

// Get request to get all comments of a blog by title and authorMail
app.get('/api/getComments', async (req, res) => {
    const { blogTitle, authorMail } = req.query;
    try {
        const comments = await Comment.find({ blogTitle, authorMail });
        res.json(comments);
    } catch (error) {
        res.status(500).json({ error: 'Failed to get comments' });
    }
});



// Start the server
app.listen(5000, () => {
    console.log('Server is running on port 5000');
});

export default app;
