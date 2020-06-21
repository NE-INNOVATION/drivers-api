const express = require('express')
var rn = require('random-number');
const router = express.Router({mergeParams: true})
const dataStore = require('../../data/dataStore')

var gen = rn.generator({
  min:  100000000
, max:  999999999
, integer: true
})

router.route('/driverInfo/:id/:quoteId')
  .get(async (req, res, next) => {
    res.send(JSON.stringify(await getDriverInfo(req.params.id, reques.params.quoteId)))
  })
  .post(async (req, res, next) => {
    res.send(JSON.stringify({result : await saveDriverInfo(req.body, req.params.quoteId)}))
  })

let getDriverInfo = async (id, quoteId) => {
  console.log('Returning Driver #', id)
  let driver = await dataStore.findDriver(quoteId)
  return driver
}

let saveDriverInfo = async (data, quoteId) => {
  let driver = '';
  if(data.id !== ''){
    driver = await dataStore.findDriver(quoteId);
  }else{
    driver = {};
    driver.quoteId = quoteId;
  }
  
  driver.name = data.name
  driver.gender = data.gender
  driver.maritalStatus = data.maritalStatus
  driver.ssn = data.ssn
  driver.employmentStatus = data.employmentStatus
  driver.currentIns = data.currentIns
  driver.licensedAge = data.licensedAge
  driver.education = data.education
  driver.licenseNum = data.licenseNum
  
  if(data.id === '') {
    driver.id = gen().toString()
  }

  dataStore.addDriver(driver)

  return driver.id;
}

module.exports = router;