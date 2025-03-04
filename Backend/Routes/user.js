import { Router } from 'express';
import { userModel } from '../db.js';
import jwt from 'jsonwebtoken';
import 'dotenv/config';
import z from 'zod';
import bcypt from 'bcrypt';
const userRouter = Router();

userRouter.post("/signup", async (req, res) => {

    try {

        const inputValidation = z.object({
            fullName: z.string().max(59).min(3),
            email: z.string().email(),
            password: z.string().max(50).min(6)
        })

        const parseData = inputValidation.safeParse(req.body);

        if (!parseData.success) {
            res.json({
                message: "Incorrect format",
                error: parseData.error
            })
            return;
        }


        const { fullName, email, password } = req.body;

        const hashedPassword = await bcypt.hash(password, 5);


        const newUser = userModel.create({
            fullName: fullName,
            email: email,
            password: hashedPassword
        });

        const token = jwt.sign({
            userId: newUser._id
        }, process.env.JWT_USERS_PASSWORD);

        res.status(201).json({
            message: "You're signup",
            token: token
        })

    } catch (e) {
        res.status(500).json({
            message: "Something went wrong" + e
        });
    }


})

userRouter.post("/signin", async (req, res) => {

    try {
        const { email, password } = req.body;

        const foundUser = await userModel.findOne({
            email
        });

        if (foundUser && (await bcypt.compare(password, foundUser.password))) {
            const token = jwt.sign({
                userId: foundUser._id
            }, process.env.JWT_USERS_PASSWORD);

            res.status(200).json({
                message: "Your are loggedIn",
                token: token
            })

        } else {
            res.json({
                message: "Inccorect credentials"
            })
        }
    } catch (e) {
        res.status(500).json({
            message: " Logging failed" + e
        })
    }
})

export default userRouter