require('express-async-errors');
const helmet = require('helmet');
const cors = require('cors');
const xss = require('xss-clean');
const rateLimiter = require('express-rate-limit');
const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const path = require('path');

const connectDB = require('./db/connect');

// IMPORT ROUTES AND MIDDLEWARE
const exchangeRouter = require('./routes/exchange');

const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

// SECURITY
app.set('trust proxy', 1);
app.use(rateLimiter({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 200, // Limit each IP to 200 requests per `window` (here, per 15 minutes)
}));
app.use(express.json());
app.use(cors());
app.use(xss());
app.use(helmet());

// Middleware

app.use(express.static(path.resolve(__dirname, '../client/build')));

// ROUTES
app.use('/api/v1/exchange', exchangeRouter);

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
  });

// ERROR MIDDLEWARES
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 4000;
const start = async ()=>{
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(port, ()=>{
            console.log(`Server listening on port ${port}...`);
        });
    } catch (error) {
        console.log(error);
    };
}
start();