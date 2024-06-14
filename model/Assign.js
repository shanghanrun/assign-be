const mongoose =require('mongoose')
const Schema = mongoose.Schema


const assignSchema = Schema({
	// userId:{type:mongoose.ObjectId, default:1}, 
	week:{type:Number, default:1}, 
	dueDate:{type:String, default:''},// 2024-06-10
	lecture:{type:String, default:''},// 쇼핑몰 만들기 24~25
	assignType:{type:String, default:'도메인 제출'},//없음
	status:{type:String, default:'미제출'}, // 패스,잘함,fail,재제출
	submit:{type:String, default:'과제없음'},// 제출하기,마감
	feedback:{type:String, default:''},
	reportId:{type:mongoose.ObjectId} //리포트작성시 값이 들어온다.
},{timestamps:true})

assignSchema.methods.toJSON =function(){
	const obj = this._doc
	delete obj.__v
	delete obj.createdAt
	delete obj.updatedAt
	return obj
}


const Assign = mongoose.model("Assign", assignSchema)

module.exports = Assign;