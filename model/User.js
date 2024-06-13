const mongoose =require('mongoose')
const Schema = mongoose.Schema
const jwt = require('jsonwebtoken')
require('dotenv').config()
const secretKey = process.env.JWT_SECRET_KEY


const userSchema = Schema({
	email:{type:String, required:true, unique:true},
	password:{type:String, required:true},
	name:{type:String, required:true},
	feedback:{type:String, default:''},
	image:{type:String, default:''},
	status:{type:String, default:'미제출'}, // 패스, 잘함, fail
	failNo:{type:Number, default:10000}, // 실패횟수
	notSubmit:{type:Number, default:true}, // 제출안함
	notSubmitNo:{type:Number, default:0} // 제출안한 횟수
},{timestamps:true})

userSchema.methods.toJSON =function(){
	const obj = this._doc
	delete obj.password
	delete obj.__v
	delete obj.createdAt
	delete obj.updatedAt
	return obj
}

userSchema.methods.generateToken = async function(){
	const token = await jwt.sign({_id:this._id}, secretKey,{expiresIn:"1d"})
	return token;
}

const User = mongoose.model("User", userSchema)

module.exports = User;