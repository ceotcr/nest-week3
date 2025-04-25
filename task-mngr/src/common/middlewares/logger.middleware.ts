import { NextFunction, Request, Response } from 'express';

export const loggerMiddleware = (req: Request, res: Response, next: NextFunction) => {
    console.log(JSON.stringify({
        method: req.method,
        url: req.url,
        timeStamp: new Date().toLocaleString()
    }))
    next();
};