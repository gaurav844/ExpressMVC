const { createUser ,getUserByUserId,getUsers,updateUser,deleteUser,loginUser} = require("./user.controller")
const router = require("express").Router()

const {checkToken} = require("../../auth/token_validation")

router.post("/",checkToken,createUser)
router.get("/",checkToken,getUsers)
router.get("/:id",checkToken,getUserByUserId)
router.patch("/",checkToken,updateUser)
router.delete("/",checkToken,deleteUser)
router.post("/login",loginUser)

module.exports = router