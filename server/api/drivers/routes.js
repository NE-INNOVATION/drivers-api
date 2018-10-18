const express = require('express')
const router = express.Router({mergeParams: true})
const dataStore = require('../../data/dataStore')

let drivers = [];

router.route('/driverInfo/:id/:quoteId')
  .get((req, res, next) => {
    res.send(JSON.stringify(getDriverInfo(req.params.id, reques.params.quoteId)))
  })
  .post((req, res, next) => {
    res.send(JSON.stringify({result : saveDriverInfo(req.body, req.params.quoteId)}))
  })

let getDriverInfo = (id, quoteId) => {
  console.log('Returning Driver #', id)
  return drivers.find( x => x.id === id && x.quoteId === quoteId)
}

let saveDriverInfo = (data, quoteId) => {
  let driver = '';
  if(data.id !== ''){
    driver = drivers.find( x => x.id === data.id );
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
  
  if(data.id === '') {
    driver.id = drivers.length + 1
    drivers.push(driver)
  }

  dataStore.addDriver(driver)

  return drivers.length;
}

module.exports = router;