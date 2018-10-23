var fs = require('fs');
module.exports = function(app){

  app.post("/upload/image", function(req, res){
    console.log('receiving image');

    var filename = req.headers.filename;

    req.pipe(fs.createWriteStream('files/' + filename))
    .on('finish', function(){
      console.log('file written');
      res.status(201).send('ok');
    });

  });

}
