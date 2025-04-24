// auth.middleware.factory.ts
import { Request, Response, NextFunction } from 'express';
import { DataSource } from 'typeorm';
import { User } from 'src/users/entities/user.entity';

export function createAuthMiddleware(dataSource: DataSource) {
    return async function (req: Request, res: Response, next: NextFunction) {
        try {
            const userRepo = dataSource.getRepository(User);
            const authHeader = req.headers['authorization'];

            if (!authHeader || !authHeader.startsWith('Basic')) {
                return res.status(401).json({ message: 'Unauthorized' });
            }

            const base64Credentials = authHeader.split(' ')[1];
            const [username, password] = Buffer.from(base64Credentials, 'base64').toString().split(':');

            if (!username || !password) {
                return res.status(401).json({ message: 'Unauthorized' });
            }

            const user = await userRepo.findOne({ where: { username, password } });
            if (!user) {
                return res.status(401).json({ message: 'Unauthorized' });
            }

            (req as any).user = user;
            next();
        } catch (err) {
            console.error('Error in auth middleware:', err);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    };
}
