'use strict';

const fs = require('fs');
const path = require('path');
const File = require('../models/file');

/*
File info is stored in the database, but the files themselves are stored on the server.
This is to make fle retrieval faster without sacrificing the ability to search file details quickly.
(Thinking about it now, a SQL database would be a better option, but MongoDB was suggested in the assignment.)
*/

exports.create = async(data) => {
    let file = new File({
        'name':data.name,
        'ext':data.ext,
        'key':data.key
    });
    let uploaded = await file.uploadData(data.file);
    if (uploaded){
        await file.save();
        return file;
    } else {
        return null;
    }
}

exports.keyExists = async(key) => {
    let file = await File.findOne({'key':key}).select('');
    if (file) return true;
    else return false;
}

exports.updateByKey = async(key,values) => {
    let updated = await File.findOneAndUpdate({'key':key},values);
    if (updated) return updated;
    else return null;
}

exports.findByKey = async(key) => {
    let file = await File.findOne({'key':key});
    if (file){
        let data = await file.downloadData();
        return {
            'name':file.name,
            'data':data
        };
    } else {
        return null;
    }
}

exports.deleteByKey = async(key) => {
    let file = await File.findOneAndDelete({'key':key});
    if (file){
        await file.deleteData();
        return true;
    } else {
        return false;
    }
}

exports.deleteAll = async() => {
    await File.deleteMany({});
}