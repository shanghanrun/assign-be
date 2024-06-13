const mongoose =require('mongoose')
const Schema = mongoose.Schema


const reportSchema = Schema({
	assignId:{type:mongoose.ObjectId, required:true},
	userId:{type:mongoose.ObjectId, required:true},
	userName:{type:String, default:''}
	domainUrl:{type:String, default:''}, 
	beUrl:{type:String, default:''},
	feUrl:{type:String, default:''},
	comment:{type:String, default:''},
	response:{type:String, default:''} 
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