'use strict';

const fs = require('fs');
const path = require('path');
const File = require('../models/file');

exports.create = async(data) => {
    let file = new File({
        'name':data.name,
        'ext':data.ext
    });
    if (data.file){
        console.log('saving data');
        let response = await file.saveData(data.file);
        console.log(response);
        await file.save();
        console.log(file);
        return file;
    } else {
        return null;
    }
}

exports.findOne = async(id) => {
    let result = await File.findOne({'_id':id});
    return result;
}

exports.deleteOne = async(id) => {
    let result = await File.findOneAndDelete({'_id':id});
    return result;
}