const formidable = require('formidable');

module.exports = function (req){
	return new Promise((resolve,reject)=>{
		
		let form = new formidable.IncomingForm();
		form.parse(req, function(err, fields, files) {
			if (err) reject(err.message);
			else resolve({'fields':fields,'files':files});
		});
	});
}