const mongoose =require('mongoose')
const User = require('./User')
const UserAssign = require('./UserAssign')
const Schema = mongoose.Schema


const reportSchema = Schema({
	userAssignId: { type: mongoose.ObjectId, ref: 'UserAssign' },
	userId:{type:mongoose.ObjectId, ref:User},
	userName:{type:String, default:''}, 
	assignDueDate:{type:String, default:''},
	assignLecture:{type:String, default:''},
	domain:{type:String, default:''}, 
	frontEnd:{type:String, default:''},
	backEnd:{type:String, default:''},
	comment:{type:String, default:''},
	response:{type:String, default:''},
	fail:{type:Boolean, default:false},
	notSubmit:{type:Boolean, default:false} 
	// response는 admin이 report를 열고서 숙제의 검사를 하면서,
	// 피드백을 작성하는 란인데, 여기에 작성하면, 저장될 때,
	// user의 feedback란에 이 내용이 자동입력되게 한다. 
},{timestamps:true})

reportSchema.methods.toJSON =function(){
	const obj = this._doc
	delete obj.__v
	delete obj.createdAt
	delete obj.updatedAt
	return obj
}


const Report = mongoose.model("Report", reportSchema)

module.exports = Report;