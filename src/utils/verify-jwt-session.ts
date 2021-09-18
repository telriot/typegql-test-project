import { Request } from 'express';
import { NotAuthorizedError } from 'errors/not-authorized-error';
import jwt from 'jsonwebtoken';

export type JwtUserPayload = { id: string; email: string };

const verifyJwtSession = (req: Request) : JwtUserPayload => {
  // console.log(req.session, 'verifyjwtsession req object')
	if (!req.session?.jwt) throw new NotAuthorizedError();
	return jwt.verify(req.session.jwt, process.env.JWT_KEY!) as JwtUserPayload;
};

export default verifyJwtSession