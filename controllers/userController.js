const userModel = require('../models/userModel')
const bcrypt = require('bcrypt')
const saltRounds = 10
const jwt = require('jsonwebtoken')
const secret = require('../secret')
const formatjson = require('../formatres')
// const { validationResult } = require('express-validator/check')


const checkParameter = () => {
    return new Promise(resolve => {
        console.log('Error Parameter');
    })
}
module.exports = {
    login: (req,res) => {
        userModel.loginUser(req.con,req.body,(error,result,field) => {
            //cek apakah user & password terdaftar
            if(!result.length || error){ 
                formatjson.formatrest(
                    null,'Username / Password is Wrong',error,res
                )
            }else{
                const token = jwt.sign({ username : req.body.username },secret.jwtkey)
                formatjson.formatrest(
                    {'username':result[0].username, 'token':token},
                    'Account Login Successfully',
                    error,
                    res)
            }
        })
    },
    register: async (req,res) => {
        //check Parameter
        if (req.body.username === undefined || req.body.password === undefined) {
            formatjson.formatrest(null,'Error Parameter',null,res)
        }
        //Check Username 
        else if(!req.body.username !== null || req.body.password !== null){
            userModel.checkUsername(req.con,req.body,(err,result,field) => {
                // console.log(result[0].cnt);
                if(err){
                    throw err;
                }else if (result[0].cnt > 0){
                    formatjson.formatrest(result,'Username Telah Digunakan',err,res)
                }else{
                    userModel.registerUser(req.con,req.body,(err,result,field) => {
                        console.log();
                        if (err) {
                            throw err
                        }else{
                            //Error Ketika InsertToken ke DB
                            //mau coba pake async await
                            userModel.insertToken(req.con,token,userid,(err,result,field) => {
                                if (err) {    
                                    console.log(data)
                                    throw err
                                }else{
                                    const token = jwt.sign({ username: req.body.username },secret.jwtkey)
                                    token = token
                                    userid = result.insertId
                                    formatjson.formatrest({'username' : req.body.username, 'token':token},
                                            'Login Successfully',err,res)
                                    console.log(req.body.username);
                                }
                            })
                        }
                    })
                }  
            })
        }
    },    
            
        // }else{
        //     userModel.registerUser(req.con,req.body,(err,result,field) => {
        //         console.log(err);
        //         if (err) {
        //             formatjson.formatrest(null,'Error Query',err,res)
        //         }else{
        //             console.log(req.body.username);
        //             const token = jwt.sign({ username: req.body.username },secret.jwtkey)
        //             formatjson.formatrest({'username' : req.body.username, 'token':token},
        //                     'Login Successfully',err,res)
        //         }
        //     })
    update: (req,res) => {
        userModel.updateUser(req.con,req.body,req.params.id,(err,result,field) => {
                if(err){
                    throw err
                }else{
                    res.send(result)
                }
            })
    },
    updatePassword: (req,res) => {
        let hashpassword = bcrypt.hashSync(req.body.password,saltRounds)
        userModel.updateUserPassword(req.con,hashpassword,req.params.id,(err,result,field) => {
            console.log(req.params.id);
            if(err){
                throw err
            }else{
                res.send(result)
            }
        })
    }
}