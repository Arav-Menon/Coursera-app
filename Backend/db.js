import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const ObjectId = mongoose.ObjectId;

// console.log("Mongo runs")


const userSchema = new Schema({
    fullName : String,
    email :  {type : String, unique : true},
    password : String,
}) 

const adminSchema = new Schema({
    fullName : String,
    email :  {type : String, unique : true},
    password : String,

})

const courseSchema = new Schema({
    imageUrl : String,
    title : String,
    description : String,
    price : Number,
    creatorId : ObjectId
})

const purchaseSchema = new Schema({
    _id : ObjectId,
    courseId : ObjectId,
    userId : ObjectId
})

const userModel = mongoose.model("userData", userSchema);
const adminModel = mongoose.model("adminData", adminSchema);
const courseModel = mongoose.model("courseData", courseSchema);
const purchaseModel = mongoose.model("purchase", purchaseSchema);

export { userModel, adminModel, courseModel, purchaseModel }

