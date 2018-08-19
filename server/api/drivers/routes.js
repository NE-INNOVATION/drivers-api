const express = require('express')
const pageConfig = require('./pageConfig')
const router = express.Router({mergeParams: true})
var drivers = [
  {
      type: 'self',
      personalInfo: {
          name: '',
          marital_status: '',
          gender: '',
          ssn:''
      },
      priorinsurance: {
          alreadyinsured: '',
          licensed_age: ''
      },
      professionalInfo:{
          education: '',
          employment: ''
      }
  },
  {
      type: 'spouse',
      personalInfo: {
          name: '',
          gender: '',
          ssn: ''
      },
      professionalInfo:{
          education: '',
          employment: ''
      }
  }
];
router.route('/personalInfo')
  .get((req, res, next) => {
    res.send(JSON.stringify(pageConfig.getPageConfig('PersonalInfo', drivers)))
  })
  .post((req, res, next) => {
    drivers[0].personalInfo.name = req.body.name;
    drivers[0].personalInfo.marital_status = req.body.maritalstatus;
    drivers[0].personalInfo.gender = req.body.gender;
    drivers[0].personalInfo.ssn = req.body.ssn;
    res.send('data saved')
  })

router.route('/priorInsurance')
  .get((req, res, next) => {
    res.send(JSON.stringify(getPageConfig('PriorInsurance', drivers)))
  })
  .post((req, res, next) => {
    drivers[0].priorinsurance.alreadyinsured = req.body.priorins;
    drivers[0].priorinsurance.licensed_age = req.body.agesince;
    res.send('data saved')
  })

router.route('/professionalInfo')
  .get((req, res, next) => {
    res.send(JSON.stringify(getPageConfig('ProfessionalInfo', drivers)))
  })
  .post((req, res, next) => {
    drivers[0].professionalInfo.education = req.body.education;
    drivers[0].professionalInfo.employment = req.body.employment;
    res.send('data saved')
  })

module.exports = router;