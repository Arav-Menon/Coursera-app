import jwt from 'jsonwebtoken';
import 'dotenv/config';

 export const userMiddleware = (req, res, next) => {
    const token = req.headers.token;

    const decoded = jwt.verify(token, process.env.JWT_USERS_PASSWORD);

    if(decoded) {
        req.userId = decoded.id
        next()
    }else {
        res.status(403).json({
            message : "You're not signed in"
        })
    }

}