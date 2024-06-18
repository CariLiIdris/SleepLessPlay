import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import router from './routes/user.routes.js';
import dbConnect  from './config/mongoose.config.js';

const app = express();
const PORT = process.env.PORT;

dotenv.config();

dbConnect();

app.use(express.json(), cors());
app.use('/api', router);


// Middleware to handle route paths that are not found
app.use((req, res, next) => {
    // const err = new Error(`Not Found`);
    err.statusCode = 404;
    err.name = `Not Found`;
    next(err);
})

app.use((err, req, res, next) => {
    err.name === "ValidationError"? err.statusCode = 400 : ""
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