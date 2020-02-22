const bengkelModel = require('../models/bengkelModel')
const formatjson = require('../formatres')

module.exports = {
    getBengkel : (req,res) => {
        bengkelModel.getBengkel(req.con,req.query,(err,result,field) => {
            if(err){
                formatjson.formatrest(null,'Error Query',err,res)
            }else{
                if(result.length === 0) {
                    formatjson.formatrest({ result }, 'Bengkel Not Found',err,res)
                }else{
                    formatjson.formatrest({ result },'Search Bengkel Successfully',err,res)
                }
            }
        })
    },
    insertBengkel : (req,res) => {
        bengkelModel.insertBengkel(req.con,req.body,(err,result,field) => {
            if (err) {
                console.log(err);
                formatjson.formatrest(null,'Error Query',err,res)
            }else{
                formatjson.formatrest({
                    'id':result.insertId, 
                    'NamaBengkel':req.body.nama_bengkel,
                    'AlamatBengkel':req.body.alamat_bengkel,
                    'NoTeleponBengkel':req.body.no_telepon_bengkel,
                    'JamBuka':req.body.jam_buka,
                    'JamTutup':req.body.jam_tutup,
                    'Latitude':req.body.latitude,
                    'Longitude':req.body.longitude,
                    'ImageBengkel':req.body.image_bangkel,
                },
                    'Input Bengkel Successfully',
                    err,
                    res)
            }
            
        })
    }
}