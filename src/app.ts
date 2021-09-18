import Express from 'express';
import cors from 'cors';
import { CORS_ALLOWED_ORIGINS } from './config';
import cookieSession from 'cookie-session';

export const app = Express();

app.set('trust proxy', true);
app.use(
	cors({
		credentials: true,
		origin: CORS_ALLOWED_ORIGINS
	})
);
app.use(
	cookieSession({
		name:'jwt-token-gql-test',
		keys:[process.env.SESSION_SECRET || 'somerandomsecret'],
		signed: true,
		secure: process.env.NODE_ENV === 'production',
		httpOnly:true,
		maxAge: 1000 * 60 * 60 * 24 * 365
	})
);