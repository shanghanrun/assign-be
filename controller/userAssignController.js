const userAssignController={}
const UserAssign = require('../model/UserAssign')
const Assign = require('../model/Assign')

userAssignController.createUserAssignList=async(req, res)=>{
	try{
		const {userId} = req.body;
		console.log('create에서 userId:', userId)
		const assignList = await Assign.find()

		 // Assign 데이터 수만큼 UserAssign 생성
		const userAssignList = assignList.map(assign => ({
		...assign._doc, // Assign 데이터 복사
		userId // userId 필드 추가
		}));

		// UserAssign을 데이터베이스에 저장
		await UserAssign.insertMany(userAssignList);

		res.status(201).json({ message: 'UserAssigns 생성 완료' });
	}catch(e){
		return res.status(400).json({status:'fail', error:e.message})
	}
}

userAssignController.getUserAssignList=async(req,res)=>{
	try{
		const {userId} = req.body
		console.log('받은 userId:', userId)
		// const userAssigns = await UserAssign.findById(userId) 틀림(하나찾을 때 findById를 사용한다.)
		const userAssigns = await UserAssign.find({ userId });
		console.log('찾은 userAssignList :', userAssigns)
		res.status(200).json({status:'ok', data: userAssigns})
	}catch(e){
		res.status(400).json({status:'fail', error: e.error})
	}
}

userAssignController.updateUserAssign=async(req,res)=>{
	try{
		const {userAssignId,status, submit, feedback, reportId} = req.body;

		if (!reportId){
			const updatedUserAssign = await UserAssign.findByIdAndUpdate(
				userAssignId,
				{status, submit, feedback},
				{new: true}
			)
		} else{  //리포트 제출시 reportId추가
			const updatedUserAssign = await UserAssign.findByIdAndUpdate(
				UserAssignId,
				{reportId}
			)
		}
		res.status(200).json({status:'ok', data: updatedUserAssign})
	}catch(e){
		res.status(400).json({status:'fail', error:e.message})
	}
}


module.exports = userAssignController;
