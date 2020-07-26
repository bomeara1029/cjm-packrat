import express, { Request, Response, NextFunction } from 'express';
import { passport } from './framework';
import { AUTH_TYPE } from '../config';

const AuthRouter = express.Router();

AuthRouter.post('/login', (request: Request, response: Response, next: NextFunction) => {
    passport.authenticate(AUTH_TYPE.LOCAL, (error, user) => {
        if (error) return response.send({ success: false, message: error });
        return request.logIn(user, error => {
            if (error) return next(error);
            return response.send({ success: true });
        });
    })(request, response, next);
});

AuthRouter.get('/logout', (request: Request, response: Response) => {
    request['logout']();
    response.send({ success: true });
});

export default AuthRouter;