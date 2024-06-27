import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import router from './routes/user.routes.js';
import loungeRouter from './routes/lounge.routes.js'
import postRouter from './routes/post.routes.js';
import dbConnect from './config/mongoose.config.js';
import cookieParser from 'cookie-parser';
import axios from 'axios';

dotenv.config();

const app = express();
const PORT = process.env.PORT;

dbConnect();

app.use(express.json());
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(cookieParser(process.env.SECRET_KEY));
app.use('/api', router);
app.use('/api', loungeRouter);
app.use('/api', postRouter);
app.use('/users', router);
app.use('/lounges', loungeRouter);
app.use('/posts', postRouter);

// ChatEngine Authenticate
app.post('/authenticate', async (req, res) => {
    const { username } = req.body;

    try {
        const r = await axios.put(
            'https://api.chatengine.io/users/',
            {
                username: username,
                secret: username,
                first_name: username
            },
            {
                headers:
                    { "private-key": "b0631ade-f5b6-4fd6-836c-6d805767b978" }
            })
        return res.status(r.status).json(r.data)
    }
    catch (e) {
        return res.status(e.response?.status).json(e.response?.data)
    }
})

// Middleware to handle route paths that are not found
app.use((req, res, next) => {
    const err = new Error(`Not Found`);
    err.statusCode = 404;
    err.name = `Not Found`;
    next(err);
});

app.use((err, req, res, next) => {
    if (res.headersSent) {
        return next(err);
    }

    err.name === "ValidationError" ? err.statusCode = 400 : "";

    const normalizedError = {
        statusCode: err.statusCode || 500,
        message: err.message || `Something went wrong`,
        name: err.name || `Server Error`,
        validationErrors: extractValidationErrors(err)
    };

    res.status(normalizedError.statusCode).json(normalizedError);
});

function extractValidationErrors(err) {
    const validationErrors = {};
    if (err.name === 'ValidationError') {
        for (const field in err.errors) {
            if (err.errors.hasOwnProperty(field)) {
                const errorMessage = err.errors[field].message;
                validationErrors[field] = errorMessage;
            }
        }
    }
    return validationErrors;
}

app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));