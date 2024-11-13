import { Request, Response, NextFunction } from 'express';

export const verifyToken = async  (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers["x-access-token"]
    console.log(token)
}