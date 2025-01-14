// Package imports
import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';

// Database
// import connectDB from './connect/db.js';

// Routes
import endpoint from './data/endpoints.js';
import authRoutes from './routes/authRoutes.js';
import machineRoutes from './routes/machineRoutes.js';
import componentRoutes from './routes/componentRoutes.js';

// Middleware
// import notFoundMiddleware from './middleware/notFoundMiddleware.js';
// import errorMiddleware from './middleware/errorMiddleware.js';
// import protectRoute from './middleware/authMiddleware.js';

dotenv.config();

// connectDB();

const app = express();

if (process.env.NODE_ENV !== 'production') {
	app.use(morgan('dev'));
}

// Parse incoming requests as JSON
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const port = process.env.PORT || 5000;

app.get('/api/test', (req, res) => {
	res.json({ message: 'Proxy enabled' });
});

// Any time these routes are hit, route file is called
app.use(endpoint.auth, authRoutes);
app.use(endpoint.machine, machineRoutes);
app.use(endpoint.component, componentRoutes);

// Looking for route not matched errors
// app.use(notFoundMiddleware);

// Looking for errors inside existing route
// app.use(errorMiddleware);

app.listen(port, () => {
	console.log(`Server is running on port: ${port}`);
});
