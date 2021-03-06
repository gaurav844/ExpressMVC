require("dotenv").config();
const {create ,getUserByUserId,getUsers,updateUser,deleteUser,getUserByEmail} = require("./user.service")
const {genSaltSync,hashSync,compareSync} = require("bcrypt")
const {sign} = require("jsonwebtoken")

module.exports = {
    createUser : (req,res)=>{
        const body = req.body
        const salt = genSaltSync(10)
        body.password = hashSync(body.password,salt)
        create(body,(err,results)=>{
            if(err){
                console.log(err)
                return res.status(500).json({
                    success: 0,
                    message: "database connection error!"
                })
            }

            return res.status(200).json({
                success: 1,
                data: results
            })
            
        })
    },
    getUserByUserId:(req,res)=>{
        const id = req.params.id
        getUserByUserId(id,(err,results)=>{
            if(err){
                console.log(err)
                return 
            }

            if(!results){
                console.log(err)
                return res.json({
                    success: 0,
                    message: "no record found!"
                })
            }

            return res.json({
                success: 1,
                data: results
            })
        })
    },
    getUsers:(req,res)=>{
        getUsers((err,results)=>{
            if(err){
                console.log(err)
                return
            }

            if(!results){
                console.log(err)
                return res.json({
                    success: 0,
                    message: "no record found!"
                })
            }

            return res.json({
                success: 1,
                data: results
            })
        })
    },updateUser : (req,res)=>{
        const body = req.body
        const salt = genSaltSync(10)
        body.password = hashSync(body.password,salt)
        updateUser(body,(err,results)=>{
            if(err){
                console.log(err)
                return res.status(500).json({
                    success: 0,
                    message: "database connection error!"
                })
            }

            return res.json({
                success: 1,
                message: "updated successfully!"
            })
            
        })
    },deleteUser : (req,res)=>{
        const data = req.body
        
        deleteUser(data,(err,results)=>{
            if(err){
                console.log(err)
                return 
            }

            if(!results){
                console.log(err)
                return res.json({
                    success: 0,
                    message: "no record found!"
                })
            }

            return res.json({
                success: 1,
                message: "deleted successfully!"
            })
            
        })
    },loginUser : (req,res)=>{
        const data = req.body
        
        getUserByEmail(data.email,(err,results)=>{
            if(err){
                console.log(err)
                return 
            }

            if(!results){
                console.log(err)
                return res.json({
                    success: 0,
                    message: "invalid email or password!"
                })
            }

            const result = compareSync(data.password, results.password)

            if(result){
                results.password = undefined
                const jsontoken = sign({result : results},process.env.JWT_KEY,{
                    expiresIn:"1h"
                })

                return res.json({
                    success: 1,
                    message: "login successfully!",
                    token:jsontoken
                })
            }else{
                return res.json({
                    success: 0,
                    message: "invalid email or password!"
                })
            }

            
            
        })
    }
}