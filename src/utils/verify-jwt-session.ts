import { Request } from 'express';
import jwt from 'jsonwebtoken';

export type JwtUserPayload = { id: string; email: string };

const verifyJwtSession = (req: Request): JwtUserPayload | null => {
	if (!process.env.JWT_KEY) throw new Error('JWT_KEY must be defined');
	if (!req.session?.jwt) return null;
	return jwt.verify(req.session.jwt, process.env.JWT_KEY) as JwtUserPayload;
};

export default verifyJwtSession;
