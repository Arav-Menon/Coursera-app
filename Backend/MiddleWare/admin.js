import jwt from 'jsonwebtoken';
import 'dotenv/config';

export const adminMiddleWare = (req, res, next) => {
    const token = req.headers.token;

    const decoded = jwt.verify(token, process.env.JWT_ADMIN_PASSWORD);

    if (decoded) {
        req.userId = decoded.id
        next()
    } else {
        res.status(403).json({
            message: "You're not signed in"
        })
    }

}