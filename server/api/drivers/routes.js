const express = require('express')
const router = express.Router({mergeParams: true})

let drivers = [];

router.route('/driverInfo/:id')
  .get((req, res, next) => {
    res.send(JSON.stringify(getDriverInfo(req.params.id)))
  })
  .post((req, res, next) => {
    res.send(JSON.stringify({result : saveDriverInfo(req.body)}))
  })

let getDriverInfo = (id) => {
  console.log('Returning Driver #', id)
  return drivers.find( x => x.id === id )
}

let saveDriverInfo = (data) => {
  let driver = '';
  if(data.id !== ''){
    driver = drivers.find( x => x.id === data.id );
  }else{
    driver = {};
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

  return drivers.length;
}

module.exports = router;