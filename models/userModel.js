
module.exports = {
    insertToken:(conn,token,userid,callback) => {
        conn.query(`INSERT INTO user_token SET token='${token}',id_user=${userid}`,callback)
    },
    checkUsername: (conn,data,callback) => {
        conn.query(`SELECT COUNT(*) as cnt FROM users WHERE username='${data.username}'`,callback)
    },
    loginUser: (conn,data,callback) => {
        conn.query(`SELECT * FROM users WHERE username="${data.username}" AND password=SHA2("${data.password}",256)`,callback)
    },
    registerUser: (conn,data,callback) => {
        // if(data.username == undefined || data.password == undefined){
        //     return callback
        // }else{
        conn.query(`INSERT INTO users SET username="${data.username}",password=SHA2("${data.password}",256)`,callback)
        // }
    },
    updateUser: (conn,data,id,callback) => {
        conn.query(`UPDATE users SET username='${data.username}',email='${data.email}' WHERE id=${id}`,callback)
    },
    updateUserPassword: (conn,hashpassword,id,callback) => {
        conn.query(`UPDATE users SET password='${hashpassword}' WHERE id=${id}`,callback)
    }
}