const MongoInMemory = require('mongo-in-memory')
const mongoServerInstance = new MongoInMemory(27018)
 
mongoServerInstance.start((error, config) => {
    if (error) {
        console.error(error);
    } else {
        const mongouri = mongoServerInstance.getMongouri("test")
        console.log("start mongodb inmemory: ", mongouri)
    }
})
