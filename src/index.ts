import 'reflect-metadata';
import dotenv from "dotenv";
import mongoose from 'mongoose'
import {app} from './app'
import { buildApolloServer } from './apollo-server';
import { CORS_ALLOWED_ORIGINS } from './config';

dotenv.config();


const main = async () => {
	if (!process.env.JWT_KEY) {
		throw new Error('JWT_KEY must be defined');
	}
	if (!process.env.MONGO_URI) {
		throw new Error('MONGO_URI must be defined');
	}
	try {
		await mongoose.connect(process.env.MONGO_URI);
		console.log('Connected to MongoDB');
	} catch (err) {
		console.error('MongoDB connection error', err);
	}

  const apolloServer=await buildApolloServer()
	await apolloServer.start();
	// Without this sandbox does not connect
	app.use(
		apolloServer.getMiddleware({
			cors: {
				credentials: true,
				origin: CORS_ALLOWED_ORIGINS
			}
		})
	);

	apolloServer.applyMiddleware({ app });
	app.listen(4000, () => {
		console.log('server started on http://localhost:4000/graphql');
	});
};

main();
