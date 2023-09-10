const express=require("express")
const { SaveUserDetails, generateExcelFile, getUserDetails } = require("./controller")
const router=express.Router()

router.get('/check',(req,res)=>{
    res.send("Server is running")
})

router.post("/saveDetails", SaveUserDetails)

router.post('/download-users-excel', getUserDetails);

module.exports = router;