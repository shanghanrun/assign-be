const mongoose =require('mongoose')
const Schema = mongoose.Schema
const User = require('./User')
const Report = require('./Report')


const userAssignSchema = Schema({
	userId:{type:mongoose.ObjectId, ref:User}, 
	week:{type:Number, default:1}, 
	dueDate:{type:String, default:''},
	lecture:{type:String, default:''},
	assignType:{type:String, default:'도메인 제출'},
	status:{type:String, default:'미제출'}, 
	submit:{type:String, default:'과제없음'},
	feedback:{type:String, default:''},
	reportId:{type:mongoose.ObjectId, ref:Report} 
},{timestamps:true})

userAssignSchema.methods.toJSON =function(){
	const obj = this._doc
	delete obj.__v
	delete obj.createdAt
	delete obj.updatedAt
	return obj
}


const UserAssign = mongoose.model("UserAssign", userAssignSchema)

module.exports = UserAssign;