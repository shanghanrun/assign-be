const assignController={}
const Assign = require('../model/Assign')

assignController.createAssign=async(req, res)=>{
	try{
		const {userId, week,dueDate,lecture,assignType, status,submit} = req.body;
		const newAssign = new Assign({week,dueDate,lecture,assignType,status,submit})
		await newAssign.save()

		return res.status(200).json({status:'success',message:'할일 등록 성공'})
	}catch(e){
		return res.status(400).json({status:'fail', error:e.message})
	}
}

assignController.getUserAssignList=async(req,res)=>{
	try{
		const userId = req.userId
		const assigns = await Assign.find(
			{userId}
		)
		res.status(200).json({status:'ok', data: assigns})
	}catch(e){
		res.status(400).json({status:'fail', error: e.error})
	}
}

assignController.getAssign=async(req, res)=>{
	try{
		const assignId = req.assignId
		const assign = await Assign.findById(assignId)
		res.status(200).json({status:'success', assign })
	}catch(e){
		res.status(400).json({status:'fail', error:e.message})
	}
}

// 단순 수정, admin이 피드백하며 피드백추가, 사용자가 report를 제출할때 reportId 삽입
assignController.updateAssign=async(req,res)=>{
	try{
		const {assignId,week,dueDate,lecture,assignType,status, submit, feedback, reportId} = req.body;

		if (!reportId){
			const updatedAssign = await Assign.findByIdAndUpdate(
				assignId,
				{week,dueDate,lecture,assignType,status, submit, feedback},
				{new: true}
			)
		} else{  //리포트 제출시 reportId추가
			const updatedAssign = await Assign.findByIdAndUpdate(
				assignId,
				{reportId}
			)
		}
		res.status(200).json({status:'ok', data: updatedAssign})
	}catch(e){
		res.status(400).json({status:'fail', error:e.message})
	}
}


module.exports = assignController;
