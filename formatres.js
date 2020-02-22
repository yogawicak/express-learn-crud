//formatREST

module.exports = {
    formatrest: (values,message,err,response) => {
        const data = {
            'status': 200,
            'messages' : message,
            'data': values,
            'error': {
                'messages' : err
            },
        };
        response.json(data);
        response.end();    
    }
}

