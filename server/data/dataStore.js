const mongo = require('mongodb').MongoClient
const collection = process.env.COLLECTION_NAME || 'col_lrqi'
const connectionString = process.env.CONNECTION_STRING
const dbName = process.env.DB_NAME || 'lrqi'
let clientPromise

const createDbConnection = () => {
    if (!clientPromise) {
        clientPromise = getDbConnection()
    }
}

const getDbConnection = () => {
    return new Promise((resolve, reject) => {
        mongo.connect(getConnectionString(), {
            connectTimeoutMS: 30000,
            useNewUrlParser: true,
            keepAlive: 1, 
            reconnectTries: 30, 
            reconnectInterval: 2000
        },
            (err, client) => {
                if (err) {
                    console.log('Failed to connect MongoDB')
                    reject(err)
                } else {
                    console.log('Successfully created MongoDB connection')
                    resolve(client)
                }
            })
    })
}

const getConnectionString = () => {
    return connectionString != undefined ? connectionString : 'mongodb://lrqi_db:lrqi_db_pwd@lrqidb-shard-00-00-wksjy.mongodb.net:27017,lrqidb-shard-00-01-wksjy.mongodb.net:27017,lrqidb-shard-00-02-wksjy.mongodb.net:27017/test?ssl=true&replicaSet=LRQIDB-shard-0&authSource=admin&retryWrites=true'
}


const find = async (quoteId) => {
    let client = await clientPromise
    let db = client.db(dbName)
    let filter = { quoteId: quoteId, type: 'driver' }
    return new Promise((resolve, reject) => {
        try {
            db.collection(collection)
                .findOne(filter, async (err, driver) => {
                    if (err) {
                        console.log(`Something went wrong - ${err}`)
                        reject()
                    }
                    resolve(driver)
                })

        } catch (error) {
            console.log(`Something went wrong, Error - ${error}`)
            reject()
        }
    })
}

const addDriver = async (driverInfo) => {
    let client = await clientPromise
    let db = client.db(dbName)
    let filter = { quoteId: driverInfo.quoteId , type: 'driver' }
    let objectId, action
    try {
        driverInfo.type = 'driver'
        let saveResult = await db.collection(collection)
            .replaceOne(filter, driverInfo,
                {
                    upsert: true
                })
        objectId = saveResult.insertedId
        action = 'upserted'
    } catch (error) {
        console.log(`Failed to update mongo - QuoteID : ${driverInfo.quoteId}`)
    }
    console.log(`driver with QuoteID - ${driverInfo.quoteId} ${action}`)
    // client.close()
    return objectId
}

module.exports = {
    createDbConnection,
    addDriver,
    findDriver: find
}