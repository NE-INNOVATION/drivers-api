const mongo = require("mongodb").MongoClient;
const collection = process.env.COLLECTION_NAME;
const connectionString = process.env.CONNECTION_STRING;
const dbName = process.env.DB_NAME;
let clientPromise;

const createDbConnection = () => {
  if (!clientPromise) {
    clientPromise = getDbConnection();
  }
};

const getDbConnection = () => {
  return new Promise((resolve, reject) => {
    mongo.connect(
      connectionString,
      {
        connectTimeoutMS: 30000,
        useNewUrlParser: true,
        keepAlive: 1,
        useUnifiedTopology: true
      },
      (err, client) => {
        if (err) {
          console.log("Failed to connect MongoDB");
          reject(err);
        } else {
          console.log("Successfully created MongoDB connection");
          resolve(client);
        }
      }
    );
  });
};

const find = async (driverId, quoteId) => {
  let client = await clientPromise;
  let db = client.db(dbName);
  let filter = { quoteId: quoteId, id: driverId };
  return new Promise((resolve, reject) => {
    try {
      db.collection(collection).findOne(filter, async (err, driver) => {
        if (err) {
          console.log(`Something went wrong - ${err}`);
          reject();
        }
        resolve(driver);
      });
    } catch (error) {
      console.log(`Something went wrong, Error - ${error}`);
      reject();
    }
  });
};

const addDriver = async (driverInfo) => {
  let client = await clientPromise;
  let db = client.db(dbName);
  let filter = { quoteId: driverInfo.quoteId, id: driverInfo.id };
  let objectId, action;
  try {
    let saveResult = await db
      .collection(collection)
      .replaceOne(filter, driverInfo, {
        upsert: true,
      });
    objectId = saveResult.insertedId;
    action = "upserted";
  } catch (error) {
    console.log(`Failed to update mongo - QuoteID : ${driverInfo.quoteId}`);
  }
  console.log(`driver with QuoteID - ${driverInfo.quoteId} ${action}`);
  // client.close()
  return objectId;
};

module.exports = {
  createDbConnection,
  addDriver,
  findDriver: find,
};
