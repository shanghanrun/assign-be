const mongoose =require('mongoose')
const Schema = mongoose.Schema


const formSchema = Schema({
	week:{type:Number, default:1}, // 1주차, 2주차
	dueDate:{type:String, default:''},// 2024-06-10
	lecture:{type:String, default:''},// 쇼핑몰 만들기 24~25
	assignType:{type:String, default:'도메인 제출'},//없음
	submit:{type:String, default:'제출하기'}, //과제없음, 마감
	end:{type:Boolean, default:false }  // 마감여부
},{timestamps:true})

formSchema.methods.toJSON =function(){
	const obj = this._doc
	delete obj.__v
	delete obj.createdAt
	delete obj.updatedAt
	return obj
}


const Form = mongoose.model("Form", formSchema)

module.exports = Form;