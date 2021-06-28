import jwt from "express-jwt";
import jwks from 'jwks-rsa';
import { NextFunction, Request, RequestHandler, Response } from 'express';

export const jwtCheck = jwt({
    secret: jwks.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: 'https://hacks.au.auth0.com/.well-known/jwks.json'
  }),
  audience: 'https://api.reactoddhours.com:3001/',
  issuer: 'https://hacks.au.auth0.com/',
  algorithms: ['RS256'],
}); 

export type Permission = 'photo:view' | 'photo:search' | 'photo:rotate';

declare global {
    namespace Express {
        // tslint:disable-next-line:no-empty-interface
        interface User {
            permissions: Permission[]
        }
    }
}

export function hasPermission(permission: Permission): RequestHandler {
    return function (req: Request, res: Response, next: NextFunction) {
        if (req.user?.permissions?.includes(permission) ?? false) {
            next();
        }
        else {
            res.sendStatus(403);
        }
    }
}