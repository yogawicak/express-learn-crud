const userModel = require('../models/userModel')
const bcrypt = require('bcrypt')
const saltRounds = 10
const jwt = require('jsonwebtoken')
const secret = require('../secret')
const formatjson = require('../formatres')
// const { validationResult } = require('express-validator/check')



module.exports = {
    login: async (req,res) => {
        if(!result.length || error){ 
            formatjson.formatrest(
                null,'Username / Password is Wrong',error,res)
        }else{
            await userModel.loginUser(req.con,req.body,(error,result,field) => {
                const token = jwt.sign({ username : req.body.username },secret.jwtkey)
                formatjson.formatrest(
                    {'username':result[0].username, 'token':token},
                    'Account Login Successfully',
                    error,
                    res)    //cek apakah user & password terdaftar
            )}
        }
    },
    register: (req,res) => {
        userModel.registerUser(req.con,req.body,(err,result,field) => {
            console.log(err);
            if (err) {
                formatjson.formatrest(null,'Error Query',err,res)
            }else if(req.body.username == undefined || req.body.password == undefined){
                formatjson.formatrest(req.body,'Invalid Object Keys',err,res)
                return
            }else{
                console.log(req.body.username);
                const token = jwt.sign({ username: req.body.username },secret.jwtkey)
                formatjson.formatrest({'username' : req.body.username, 'token':token},
                        'Login Successfully',err,res)
            }
        })
        
    },
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