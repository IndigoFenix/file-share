'use strict';

const { randomString } = require('../helpers/funcs');
const fileRepository = require('../repositories/file');

exports.create = async (body) => {
	console.log(body);
	if (!body.name) return { 'success': false, 'error': 400, 'message': 'name is required' };
	if (!body.ext) return { 'success': false, 'error': 400, 'message': 'ext is required' };
	if (!body.file) return { 'success': false, 'error': 400, 'message': 'file is required' };

	const key = randomString(6);

	let exists = await fileRepository.findByKey(key);
	if (exists) {
		await fileRepository.deleteByKey(key);
	}

	let file = await fileRepository.create({
		'name': body.name,
		'ext': body.ext,
		'file': body.file,
		'key': key
	});

	if (file){
		return { 'success': true, 'result': { 'key': key } };
	} else {
		return { 'success': false, 'error': 'File could not be created' }
	}

};

exports.getByKey = async (key) => {
	if (!key) return { 'success': false, 'error': 400, 'message': 'Key is required' };
	try {
		let obj = await fileRepository.findByKey(key);
		if (obj) return { 'success': true, 'result': obj };
		else return { 'success': false, 'error': 404, 'message': 'file ' + id + ' not found ' };
	} catch (error) {
		return { 'success': false, 'error': 500, 'message': error.message }
	}
};

exports.delete = async (id) => {
	if (!id) return { 'success': false, 'error': 400, 'message': 'Id is required' };

	try {
		let deleted = await fileRepository.deleteOne(id);
		if (deleted) return { 'success': true, 'result': deleted };
		else return { 'success': false, 'error': 404, 'message': 'Could not delete' };
	} catch (error) {
		return { 'success': false, 'error': 500, 'message': error.message }
	}
};