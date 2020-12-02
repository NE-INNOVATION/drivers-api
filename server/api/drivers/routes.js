const express = require("express");
var rn = require("random-number");
const router = express.Router({ mergeParams: true });
const dataStore = require("../../data/dataStore");
const winston = require("winston");
const logger = winston.createLogger({
  transports: [new winston.transports.Console()],
});

var gen = rn.generator({
  min: 100000000,
  max: 999999999,
  integer: true,
});

router
  .route("/driverInfo/:quoteId/:driverId?")
  .get(async (req, res) => {
    logger.info(
      `app.api.drivers - getting driver with id - ${req.params.driverId}`
    );
    res.send(
      JSON.stringify(
        await getDriverInfo(req.params.driverId, req.params.quoteId)
      )
    );
  })
  .post(async (req, res) => {
    logger.info(`app.api.drivers - creating new driver`);
    res.send(
      JSON.stringify({
        result: await saveDriverInfo(req.body, req.params.quoteId),
      })
    );
  });

let getDriverInfo = async (driverId, quoteId) => {
  try {
    let driver = await dataStore.findDriver(driverId, quoteId);
    return driver;
  } catch (error) {
    logger.error(
      `app.api.drivers - getting driver#${driverId}, from quote#${quoteId} failed - ${JSON.stringify(
        error
      )}`
    );
  }
};

let saveDriverInfo = async (data, quoteId) => {
  try {
    let driver = {};
    if (data.id) {
      driver = await dataStore.findDriver(data.id, quoteId);
    } else {
      driver.id = gen().toString();
    }

    driver.quoteId = quoteId;
    driver.name = data.name;
    driver.gender = data.gender;
    driver.maritalStatus = data.maritalStatus;
    driver.employmentStatus = data.employmentStatus;
    driver.currentIns = data.currentIns;
    driver.licensedAge = data.licensedAge;
    driver.education = data.education;
    driver.licenseNum = data.licenseNum;

    dataStore.addDriver(driver);
    return driver.id;
  } catch (error) {
    logger.error(
      `app.api.drivers - error creating new driver - ${JSON.stringify(error)}`
    );
  }
};

module.exports = router;
