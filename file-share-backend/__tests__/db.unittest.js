const mongoose = require('mongoose');
const   options = {
	socketTimeoutMS: 0,
	keepAlive: true
};


test('Framework', async () => {
    await mongoose.connect('mongodb://127.0.0.1:27017/file-share', options);
    await mongoose.disconnect();
    expect(true).toBe(true);
})