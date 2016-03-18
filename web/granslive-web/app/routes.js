module.exports = function(app, languageEndpoint) {

    app.get('/', function(req, res){
        res.render('index');
    });

    app.get('/partials/:name', showClientRequest, function (req, res) {
        var name = req.params.name;
        res.render('partials/' + name);
    });

    app.get('/partials/common/:name', showClientRequest, function (req, res) {
        var name = req.params.name;
        res.render('partials/common/' + name);
    });

    app.get('/partials/demos/:name', showClientRequest, function (req, res) {
        var name = req.params.name;
        res.render('partials/demos/' + name);
    });

    app.get('/public/resources/:name', showClientRequest, function (req, res) {
    	var name = req.params.name;
    	console.log("\n\n>>>>>>>>>>>>>>>>>>>" +name);
        res.json('app/' + name);
    });
    
    app.get('/api/dialog/dialogs', showClientRequest, languageEndpoint.getDialogs);
    app.post('/api/dialog/create', showClientRequest, languageEndpoint.createDialog);
    app.post('/api/dialog/update', showClientRequest, languageEndpoint.updateDialog);
    app.post('/api/dialog/delete', showClientRequest, languageEndpoint.deleteDialog);
    app.post('/api/dialog/intent', showClientRequest, languageEndpoint.getUserIntent);
    app.post('/api/dialog/profile', showClientRequest, languageEndpoint.updateProfile);
    app.post('/api/dialog/conversation', showClientRequest, languageEndpoint.conversation);
    app.post('/api/dialog/rnr', showClientRequest, languageEndpoint.callRnR);
    
    function showClientRequest(req, res, next) {
        var request = {
            REQUEST : {
                HEADERS: req.headers,
                BODY : req.body
            }
        }
        console.log(request);
        return next();
    }
    
    /*
    function showMultipartRequest(req, res, next) {
    	var form = new multiparty.Form();
        form.parse(req, function(err, fields, files) {
          res.writeHead(200, {'content-type': 'text/plain'});
          res.write('received upload:\n\n');
          res.end(util.inspect({fields: fields, files: files}));
        });
        return next();
    }
    */
    
}
