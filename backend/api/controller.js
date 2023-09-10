const UserModel = require("../Models/UserModel")
const Excel = require('exceljs');

const SaveUserDetails = async (req, res) => {
    const { profession, reason, joining, email } = req.body
    try {
        if (email) {
            const newUser = {
                profession: profession,
                reason: reason,
                joining: "YES",
                email: email
            }
            User = new UserModel(newUser)
            await User.save()
        }
        else {
            const newUser = {
                profession: profession,
                reason: reason,
                joining: "NO"
            }
            User = new UserModel(newUser)
            await User.save()
        }
        res.status(200).send({ msg: "User Created Successfully" })
    } catch (err) {
        res.status(500).send({ msg: "Internal Server Error" })
    }
}

const getUserDetails=async(req,res)=>{
    const {code}=req.body
    if(code==="12sad13@!&6&*nads"){
    const users=await UserModel.find();
    generateExcelFile(users).then((buffer) => {
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', 'attachment; filename=users.xlsx');
        res.send(buffer);
      });
    }
    else{
        res.status(400).send({msg:"Invalid Token"})
    }
}

function generateExcelFile(users) {
    const workbook = new Excel.Workbook();
    const worksheet = workbook.addWorksheet('Users');

    worksheet.columns = [
        { header: 'Profession', key: 'profession', width: 15 },
        { header: 'Reason to join', key: 'reason', width: 60 },
        { header: 'Interested in Community', key: 'joining', width: 10 },
        { header: 'Email', key: 'email', width: 30 },
    ];

    users.forEach((user) => {
        worksheet.addRow({
            profession: user.profession,
            reason: user.reason,
            joining:user.joining,
            email:user.email
        });
    });

    return workbook.xlsx.writeBuffer();
}

module.exports = {
    SaveUserDetails,
    generateExcelFile,
    getUserDetails
}