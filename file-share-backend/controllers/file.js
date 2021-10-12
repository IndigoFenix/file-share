'use strict';

const fileService = require('../services/file');
const formidable = require('formidable');

const parseForm = function (req){
	return new Promise((resolve,reject)=>{
		
		let form = new formidable.IncomingForm();
		form.parse(req, function(err, fields, files) {
			if (err) reject(err.message);
			else resolve({'fields':fields,'files':files});
		});
	});
}

exports.create = async(req, res, next) => {
	try {
		let parsed = await parseForm(req);
		for (let i in parsed.files){
			parsed.fields[i] = parsed.files[i];
		}
		let response = await fileService.create(parsed.fields);
		if (response.success) {
			res.status(200).json(response.result);
		} else {
			res.status(response.error).json({'message':response.message});
		}
	} catch (error) {
		res.status(500).json({ error: error.message })
	}
};

exports.get = async(req, res, next) => {
	try {
		let response = await fileService.findOne(req.params.id);
		if (response.success) {
			res.status(200).json(response.result);
		} else {
            res.status(response.error).json({'message':response.message});
		}
	} catch (error) {
		res.status(500).json({ error: error.message })
	}
};

exports.delete = async(req, res, next) => {
	try {
		let response = await fileService.deleteOne({'_id':req.params.id});
		if (response.success) {
			res.status(200).json(response.result);
		} else {
			res.status(response.error).json({'message':response.message});
		}

	} catch (error) {
		res.status(500).json({ error: error.message })
	}
}