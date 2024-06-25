import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import router from './routes/user.routes.js';
import loungeRouter from './routes/lounge.routes.js'
import postRouter from './routes/post.routes.js';
import dbConnect from './config/mongoose.config.js';
import cookieParser from 'cookie-parser';

const app = express();
const PORT = process.env.PORT;

dotenv.config();

dbConnect();

app.use(express.json(), cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(cookieParser(process.env.SECRET_KEY));
app.use('/api', router);
app.use('/api', loungeRouter);
app.use('/api', postRouter)
app.use('/users', router);
app.use('/lounges', loungeRouter);
app.use('/posts', postRouter);


// Middleware to handle route paths that are not found
app.use((req, res, next) => {
    const err = new Error(`Not Found`);
    err.statusCode = 404;
    err.name = `Not Found`;
    next(err);
})

app.use((err, req, res, next) => {
    err.name === "ValidationError" ? err.statusCode = 400 : ""
    // console.log(err.errors)

    // Normalize the error
    const normalizedError = {
        statusCode: err.statusCode || 500,
        message: err.message || `Something went wrong`,
        name: err.name || `Server Error`,
        validationErrors: extractValidationErrors(err)
    };

    // Return the normalized error
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