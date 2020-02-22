module.exports = {
    //query validation
    validationCount:(con,param,data,callback) => {
        switch (typeof(data)) {
            case 'string':
                con.query(`SELECT COUNT(*) AS cnt FROM data_bengkel where ${param}='${data}'`)        
                break;
            case 'number':
                con.query(`SELECT COUNT(*) AS cnt FROM data_bengkel where ${param}=${data}`)
        }        
    },
    getBengkel: (con,data,callback) => {
        con.query(`SELECT * FROM data_bengkel WHERE nama_bengkel LIKE '%${data.nama_bengkel}%'`,callback)
    },
    insertBengkel : (con,data,callback) => {
        // con.query(`INSERT INTO 'data_bengkel'('nama_bengkel', 'alamat_bengkel', 'no_telpon_bengkel', 'jam_buka', 'jam_tutup', 'Latitude', 'Longitude', 'img_bengkel') VALUES ('${data.nama_bengkel}','${data.alamat_bengkel}',${data.no_telepon_bengkel},${data.jam_buka},${data.jam_tutup},${data.latitude},${data.longitude},'${data.image_bengkel}')`,callback)
        con.query(`INSERT INTO data_bengkel SET nama_bengkel='${data.nama_bengkel}',alamat_bengkel='${data.alamat_bengkel}',no_telpon_bengkel=${data.no_telepon_bengkel},jam_buka=${data.jam_buka},jam_tutup=${data.jam_tutup},Latitude=${data.latitude},Longitude=${data.longitude},img_bengkel='${data.image_bengkel}'`,callback)
    }
}