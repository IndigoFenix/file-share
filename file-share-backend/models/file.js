const mongoose = require('mongoose');
const { Schema } = mongoose;
const fs = require('fs');
const path = require('path');

const schema = new Schema({
    name: { type: String },
    size: { type: Number },
    ext: { type: String }
});

schema.methods.saveData = function (data) {
    return new Promise((resolve,reject)=>{
        let baseDir = path.join(__dirname, '../uploads/');
        fs.open(baseDir + this._id + '.' + this.ext, 'wx', (err, file) => {
            console.log('opened file',file);
            if (err) reject(err.message);
            else {
                var fileBuffer = Buffer.from(data);
                console.log('writing file',fileBuffer);
                fs.writeFile(file, fileBuffer, (err) => {
                    if (err) reject(err.message);
                })
                fs.close();
                resolve(data);
            }
        })
    });
};

schema.methods.getData = function () {
    return new Promise((resolve,reject)=>{
        let baseDir = path.join(__dirname, '../uploads/');
        fs.readFile(baseDir + this._id + '.' + this.ext, (err, data) => {
            if (err) reject(err.message);
            else resolve(data);
        })
    });
}

module.exports = mongoose.model('File', schema);