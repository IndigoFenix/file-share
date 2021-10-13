'use strict';

const fileService = require('../services/file');
const parseForm = require('../helpers/parseForm');

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
		let response = await fileService.getByKey(req.params.key);
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