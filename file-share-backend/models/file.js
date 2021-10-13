const mongoose = require('mongoose');
const { Schema } = mongoose;
const fs = require('fs');
const path = require('path');
const baseDir = path.join(__dirname, '../uploads/');

const schema = new Schema({
    name: { type: String },
    key: { type: String, index: true, unique: true },
    ext: { type: String },
    date: { type: Date, default: Date.now() }
});

schema.methods.uploadData = function (data) {
    return new Promise((resolve,reject)=>{
        fs.rename(data.path, path.join(baseDir, this.key + '.' + this.ext), (err) => {
            if (err){
                reject(err.message);
            } else {
                resolve(true);
            }
        });
    });
};

schema.methods.downloadData = function () {
    return new Promise((resolve,reject)=>{
        fs.readFile(path.join(baseDir + this.key + '.' + this.ext), (err, data) => {
            if (err) {
                reject(err.message);
            } else {
                resolve(data);
            }
        })
    });
}

schema.methods.deleteData = function () {
    return new Promise((resolve,reject)=>{
        fs.unlink(path.join(baseDir + this.key + '.' + this.ext), (err) => {
            if (err) {
                reject(err.message);
            } else {
                resolve(true);
            }
        })
    });
}

module.exports = mongoose.model('File', schema);