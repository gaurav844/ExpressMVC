const pool = require("../../config/database")

module.exports = {
    create: (data,callBack) => {
        pool.query(
            `insert into registration(firstName,lastName,gender,email,password,number)
             values (?,?,?,?,?,?)`,
             [
                 data.first_name,
                 data.last_name,
                 data.gender,
                 data.email,
                 data.password,
                 data.number
             ],(error,results,fields) =>{
                 if(error){
                    return  callBack(error)
                 }

                 return callBack(null,results)
             }
        )
    } ,
    getUsers: callBack => {
        pool.query(
            `select * from registration`,[],
            (err,results,fields)=>{
                if(err){
                    return callBack(err)
                }

                return callBack(null,results)

            }
        )
    },
    getUserByUserId: (id,callBack) => {
        pool.query(
            `select * from registration where id = ?`,[id],
            (err,results,fields)=>{
                if(err){
                    return callBack(err)
                }

                return callBack(null,results[0])

            }
        )
    },getUserByEmail: (email,callBack) => {
        pool.query(
            `select * from registration where email = ?`,[email],
            (err,results,fields)=>{
                if(err){
                    return callBack(err)
                }

                return callBack(null,results[0])

            }
        )
    },
    updateUser: (data,callBack) => {
        pool.query(
            `update registration set firstName = ?,lastName = ?,gender = ?,email = ?,password = ?,number = ? where id = ?`,
             [
                 data.first_name,
                 data.last_name,
                 data.gender,
                 data.email,
                 data.password,
                 data.number,
                 data.id,
             ],(error,results,fields) =>{
                 if(error){
                    return  callBack(error)
                 }

                 return callBack(null,results[0])
             }
        )
    },
    deleteUser: (data,callBack) => {
        pool.query(
            `delete from registration where id = ?
             values (?,?,?,?,?,?)`,
             [
                 data.id
             ],(error,results,fields) =>{
                 if(error){
                    return  callBack(error)
                 }

                 return callBack(null,results[0])
             }
        )
    }
}