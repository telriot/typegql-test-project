import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { UserModel } from 'user/interfaces/User';
import { randomInt } from 'mock-data/utils';
import createJob from 'mock-data/create-job';
import { JobModel } from 'modules/job/interfaces/Job';

dotenv.config();

const start = async () => {
	if (!process.env.MONGO_URI) {
		throw new Error('MONGO_URI must be defined');
	}
	try {
		await mongoose.connect(process.env.MONGO_URI);
		console.log('Connected to MongoDB');
	} catch (err) {
		console.error('MongoDB connection error', err);
	}
};

const buildTestDb = async () => {
	try {
		await start();
		const users = await UserModel.find()
		await Promise.all(
			users.map(async (user) => {
				const { _id } = user.deserialize();
				const jobs = new Array(randomInt(20, 5)).fill(true);
				await Promise.all(
					jobs.map(async () => {
						const job = createJob(_id);
						await JobModel.create(job);
					})
				);
				console.log(
					`User ${user.firstName} ${user.lastName} successfully created`
				);
			})
		);
	} catch (error) {
    console.log(error.message)
		console.log('db creation failed');
	}
};
buildTestDb().then(() => process.exit());
