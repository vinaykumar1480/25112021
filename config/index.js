const mongo = require('./db');

module.exports = async (arg1, arg2, arg3) => {
    await mongo().then( async mongoose => {
            console.log('Connected to mongo!!');
            //await command.execute(client, message, args);
            /** ready to use. The `mongoose.connect()` promise resolves to mongoose instance. */ },
        err => { /** handle initial connection error */ }
    );
};