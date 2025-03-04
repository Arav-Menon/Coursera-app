import { Router } from 'express';
import { adminModel, courseModel } from '../db.js'
import jwt from 'jsonwebtoken';
import 'dotenv/config';
import z from 'zod';
import bcypt from 'bcrypt';
import { adminMiddleWare } from '../MiddleWare/admin.js';
const adminRouter = Router();

adminRouter.post("/signup", async (req, res) => {

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


        const newAdmin = await adminModel.create({
            fullName: fullName,
            email: email,
            password: hashedPassword,
            // adminId: adminId
        });

        const token = jwt.sign({
            userId: newAdmin._id
        }, process.env.JWT_ADMIN_PASSWORD);

        res.status(201).json({
            message: "You're signup",
            token: token
        })
    } catch (e) {
        res.status(500).json({
            message: "Something went wrong" + e
        })
    }

})

adminRouter.post("/signin", async (req, res) => {

    try {
        const { email, password } = req.body;

        const foundUser = await adminModel.findOne({
            email
        });

        if (foundUser && (await bcypt.compare(password, foundUser.password))) {
            const token = jwt.sign({
                userId: foundUser._id
            }, process.env.JWT_ADMIN_PASSWORD);

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

adminRouter.post("/create-course", adminMiddleWare, async (req, res) => {
    const adminId = req.userId

    const { imageUrl, title, description, price } = req.body;

    const newCourse = await courseModel.create({
        imageUrl: imageUrl,
        title: title,
        description: description,
        price: price,
        creatorId: adminId
    })

    res.json({
        message: "Course created Successfully",
        courseId: newCourse._id
    })


})

adminRouter.put("/create-course/courseId", adminMiddleWare, async (req, res) => {

    const adminId = req.userId

    const { imageUrl, title, description, price } = req.body;

    const updatedCourse = await courseModel.updateOne({
        _id: courseId,
        creatorId: adminId
    },
        {
            imageUrl: imageUrl,
            title: title,
            description: description,
            price: price,
        }, 
            {new : true}
        )

    res.json({
        message: "Course edited Successfully",
        courseId: updatedCourse._id
    })


})

export default adminRouter