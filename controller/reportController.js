const reportController={}
const Report = require('../model/Report')
const Assign = require('../model/Assign')
const assignController = require('./assignController')

reportController.createReport=async(req, res)=>{
	try{
		const {assignId,userId,userName, domainUrl, beUrl, feUrl,comment} = req.body;
		const newReport = new Report({assignId,userId,userName, domainUrl, beUrl, feUrl,comment})
		await newReport.save()

		// assign에 reportId를 넣어준다.
		const newReportId = newReport._id;
		await assignController.updateAssign({assignId, newReportId})
		

		return res.status(200).json({status:'success',message:'숙제 등록 성공'})
	}catch(e){
		return res.status(400).json({status:'fail', error:e.message})
	}
}

// admin 페이지에, 회원의 assign테이블과 동일한 모습의 테이블이 보이게 한다.
// 그래서 해당테이블을 클릭하면, 해당 assign에 입력한 숙제(report)가 팝업으로 뜨게 한다.
// report가 뜨게하려면 해당 report정보를 가져와야 된다.
reportController.getReport=async(req, res)=>{
	try{
		const reportId = req.reportId
		const report = await Report.findById(reportId)
		res.status(200).json({status:'success', report })
	}catch(e){
		res.status(400).json({status:'fail', error:e.message})
	}
}
reportController.getReportList=async(req,res)=>{
	try{
		const reports = await Report.find()
		res.status(200).json({status:'ok', data: reports})
	}catch(e){
		res.status(400).json({status:'fail', error:e.message})
	}
}
reportController.updateReport=async(req,res)=>{// 재제출할 경우와 admin이 리스판스 달 경우
	//이때에는 assign에 reportId가 부여된 상태라서, reportId로 접근 가능하다.
	// assignId도 필요하다.
	try{
		const {assignId, reportId, domainUrl, beUrl, feUrl,comment, response} = req.body;

		const updatedReport = await Report.findByIdAndUpdate(
			reportId,
			{domainUrl, beUrl, feUrl,comment, response},
			{new: true}
		)
		
		// admin이 response를 달게 되면, assign의 feedback항목에 해당 내용을 입력한다.
		if(response){
			await assignController.updateAssign({assignId, response})
		}
		if(!updatedReport) throw new Error("Report doesn't exist")
		res.status(200).json({status:'ok', data: updatedReport})
	}catch(e){
		res.status(400).json({status:'fail', error:e.message})
	}
}


module.exports = reportController;
